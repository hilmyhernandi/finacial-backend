import amqp, { Channel, ChannelModel } from "amqplib";
import { RABBITMQ_CONFIG } from "../config/rabbitMQ.config.js";
import { SUCCESS_MESSAGE } from "../constants/messages.constants.js";
import { loggerRabbitMQ } from "../config/logger.config.js";


/**
 * RabbitMQ Core Class
 * Pola: Singleton + Lazy Connection
 */
export class RabbitMQ {
  // Instance tunggal (Singleton)
  private static instance: RabbitMQ | null = null;

  // ChannelModel = connection level
  private channelModel?: ChannelModel;

  // Channel = komunikasi publish/consume
  private channel?: Channel;

  // Flag untuk mencegah double connect
  private isConnecting = false;

  // Constructor private → tidak bisa new dari luar
  private constructor() {}

  /**
   * Entry point utama RabbitMQ
   * Selalu gunakan method ini
   */
  public static async getInstance(): Promise<RabbitMQ> {
    if (!this.instance) {
      this.instance = new RabbitMQ();
    }

    // Pastikan koneksi selalu tersedia
    await this.instance.ensureConnection();
    return this.instance;
  }

  /**
   * Memastikan RabbitMQ terkoneksi
   * - Lazy init
   * - Auto reconnect
   */
  private async ensureConnection(): Promise<void> {
    // Jika channel sudah ada → skip
    if (this.channel && this.channelModel) return;

    // Jika sedang connect → jangan dobel
    if (this.isConnecting) return;

    this.isConnecting = true;

    try {
      // Membuka koneksi ke RabbitMQ
      this.channelModel = await amqp.connect(RABBITMQ_CONFIG.uri);

      /**
       * Listener jika koneksi ditutup
       * Biasanya karena network issue
       */
      this.channelModel.on("close", () => {
        loggerRabbitMQ.warn("RabbitMQ connection closed. Reconnecting...");
        this.reset();
      });

      /**
       * Listener error level connection
       */
      this.channelModel.on("error", (err) => {
        loggerRabbitMQ.error("RabbitMQ connection error", err);
        this.reset();
      });

      // Membuat channel dari connection
      this.channel = await this.channelModel.createChannel();

      loggerRabbitMQ.info(`${SUCCESS_MESSAGE.RABBITMQ.CONNECTION_SUCCESS}`);
    } catch (error) {
      // Jika gagal connect → retry setelah delay
      loggerRabbitMQ.error("RabbitMQ connection failed", error);
      setTimeout(() => this.reset(), 5000);
    } finally {
      this.isConnecting = false;
    }
  }

  /**
   * Reset state internal
   * Dipakai saat reconnect
   */
  private reset(): void {
    this.channel = undefined;
    this.channelModel = undefined;
  }

  /**
   * Getter channel
   * Digunakan producer & consumer
   */
  public async getChannel(): Promise<Channel> {
    await this.ensureConnection();

    if (!this.channel) {
      throw new Error("RabbitMQ channel not available");
    }

    return this.channel;
  }

  /**
   * Healthcheck RabbitMQ
   * Bisa dipakai untuk endpoint /health
   */
  public async healthCheck(): Promise<boolean> {
    try {
      const channel = await this.getChannel();
      await channel.checkQueue("healthcheck.tmp");
      return true;
    } catch {
      return false;
    }
  }
}
