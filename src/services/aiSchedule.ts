import { DogProfile, OwnerProfile } from '../store/appStore';

export interface ScheduleDay {
  day: string;
  date: string;
  tasks: ScheduleTask[];
  totalXP: number;
  theme: string;
}

export interface ScheduleTask {
  id: string;
  title: string;
  description: string;
  duration: number;
  xp: number;
  type: 'training' | 'walk' | 'play' | 'social' | 'rest';
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  emoji: string;
}

export interface WeeklySchedule {
  days: ScheduleDay[];
  weeklyGoal: string;
  tips: string[];
  generatedAt: string;
}

const API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY ?? '';

function buildPrompt(dog: Partial<DogProfile>, owner: Partial<OwnerProfile>): string {
  const ageLabel =
    (dog.age ?? 0) <= 6 ? 'yavru (0-6 ay)' :
    (dog.age ?? 0) <= 12 ? 'genç (6-12 ay)' :
    (dog.age ?? 0) <= 24 ? '1-2 yaş' : '2+ yaş';

  return `Sen bir uzman köpek eğitim koçusun. Aşağıdaki bilgilere göre 7 günlük kişiselleştirilmiş bir eğitim programı oluştur.

KÖPEK BİLGİLERİ:
- İsim: ${dog.name || 'Köpek'}
- Irk: ${dog.breed || 'Karışık'}
- Yaş: ${ageLabel}
- Cinsiyet: ${dog.gender === 'female' ? 'Dişi' : 'Erkek'}
- Boy: ${dog.size === 'small' ? 'Küçük' : dog.size === 'medium' ? 'Orta' : 'Büyük'}

SAHİP BİLGİLERİ:
- Uyanma saati: ${owner.wakeUpTime || '07:00'}
- Çalışma düzeni: ${owner.workSchedule === 'home' ? 'Evden çalışıyor' : owner.workSchedule === 'partTime' ? 'Yarı zamanlı' : 'Tam zamanlı'}
- Deneyim: ${owner.experienceLevel === 'beginner' ? 'Yeni başlayan' : owner.experienceLevel === 'intermediate' ? 'Orta seviye' : 'Deneyimli'}
- Hedefler: ${(owner.goals || []).join(', ') || 'Genel eğitim'}

ÇIKTI FORMATI (sadece JSON):
{
  "days": [
    {
      "day": "Pazartesi",
      "date": "2026-06-13",
      "theme": "Gün teması",
      "tasks": [
        {
          "id": "unique_id",
          "title": "Görev başlığı",
          "description": "1-2 cümle açıklama",
          "duration": 15,
          "xp": 30,
          "type": "training",
          "timeOfDay": "morning",
          "emoji": "🎯"
        }
      ],
      "totalXP": 100
    }
  ],
  "weeklyGoal": "Bu haftanın ana hedefi",
  "tips": ["İpucu 1", "İpucu 2", "İpucu 3"],
  "generatedAt": "2026-06-13T00:00:00Z"
}

Kurallar:
- Her güne 3-5 görev, günlük maks 60 dk
- Pazar hafif/dinlenme
- XP: kısa=15-25, orta=30-50, uzun=60-100
- Türkçe, sadece JSON`;
}

export async function generateWeeklySchedule(
  dog: Partial<DogProfile>,
  owner: Partial<OwnerProfile>,
  onChunk?: (text: string) => void
): Promise<WeeklySchedule> {
  if (!API_KEY) {
    throw new Error('EXPO_PUBLIC_ANTHROPIC_API_KEY eksik. .env dosyasına ekleyin.');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4000,
      stream: false,
      messages: [{ role: 'user', content: buildPrompt(dog, owner) }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API hatası: ${response.status} ${err}`);
  }

  const data = await response.json() as { content: Array<{ type: string; text: string }> };
  const fullText = data.content.find((c) => c.type === 'text')?.text ?? '';

  onChunk?.(fullText);

  const jsonMatch = fullText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI geçerli JSON döndürmedi');

  const schedule = JSON.parse(jsonMatch[0]) as WeeklySchedule;
  schedule.generatedAt = new Date().toISOString();
  return schedule;
}
