/**
 * EMAIL JOB PAYLOAD TYPE
 * fungsi: mendefinisikan tipe data untuk payload email yang akan dikirim melalui RabbitMQ.
 * Retry Meta Type
 * fungsi: mendefinisikan tipe data untuk metadata retry, yang melacak berapa kali sebuah job telah dicoba ulang.
 */

export type EmailJobPayload = {
  to: string;
  subject: string;
  html: string;
};

export type RetryMeta = {
  retryCount: number;
};
