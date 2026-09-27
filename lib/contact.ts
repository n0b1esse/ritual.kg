export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '996551177107';
export const PHONE_DISPLAY = '+996 551 177 107';
export const PHONE_SECONDARY = '+996 505 177 107';
export const INSTAGRAM_URL =
  'https://www.instagram.com/ritual.kgz?utm_source=site&utm_medium=website';
export const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '';
export const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '';

export interface LeadData {
  name: string;
  phone: string;
  service: string;
  comment: string;
  productTitle?: string;
}

export function buildLeadMessage(lead: LeadData): string {
  const lines = [
    '🪨 Новая заявка — RITUAL.KG',
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Услуга: ${lead.service}`,
  ];
  if (lead.productTitle) lines.push(`Товар: ${lead.productTitle}`);
  if (lead.comment) lines.push(`Комментарий: ${lead.comment}`);
  return lines.join('\n');
}

export function buildWhatsAppLink(lead: LeadData): string {
  const msg = encodeURIComponent(buildLeadMessage(lead));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export async function sendToTelegram(lead: LeadData): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: buildLeadMessage(lead) }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
