import { useState } from 'react';
import { useStore } from '../store';
import { palette } from '../theme';
import {
  IconVaccine, IconPill, IconScissors, IconStethoscope,
  IconScale, IconBowl, IconBell, IconCheck,
} from '@tabler/icons-react';

interface CareCard {
  id: string;
  label: string;
  Icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  status: string;
  next: string;
}

const CARDS: CareCard[] = [
  { id:'vaccines',  label:'Vaccines',     Icon:IconVaccine,     iconBg:'#EDF5FF', iconColor:'#2D7DD2', status:'3 of 5 done',    next:'Next: Rabies · 3 days' },
  { id:'flea',      label:'Flea & tick',  Icon:IconPill,        iconBg:'#FEF2F2', iconColor:'#EF4444', status:'Monthly dose',    next:'Due today' },
  { id:'grooming',  label:'Grooming',     Icon:IconScissors,    iconBg:'#FDF0F7', iconColor:'#B5417A', status:'Doodle coat',     next:'Brushed 2 days ago' },
  { id:'vet',       label:'Vet visits',   Icon:IconStethoscope, iconBg:'#F5F3FF', iconColor:'#7C3AED', status:'Last: May 28',    next:'All healthy' },
  { id:'weight',    label:'Weight',       Icon:IconScale,       iconBg:'#FFFBEB', iconColor:'#D97706', status:'8.2 kg',          next:'+0.4 this month' },
  { id:'feeding',   label:'Feeding',      Icon:IconBowl,        iconBg:'#F0FDF4', iconColor:'#16A34A', status:'3 meals/day',     next:'Next: 12:00 PM' },
];

interface RoutineItem {
  id: string;
  time: string;
  dot: string;
  label: string;
  sub: string;
  defaultDone: boolean;
}

const ROUTINE: RoutineItem[] = [
  { id:'r1', time:'7:00 AM',  dot:'#16A34A', label:'Breakfast',        sub:'¾ cup kibble',     defaultDone:true  },
  { id:'r2', time:'8:00 AM',  dot:'#EF4444', label:'Flea & tick chew', sub:'Monthly dose',     defaultDone:false },
  { id:'r3', time:'12:00 PM', dot:'#16A34A', label:'Lunch',            sub:'¾ cup kibble',     defaultDone:false },
  { id:'r4', time:'5:00 PM',  dot:'#2D7DD2', label:'Evening walk',     sub:'20 min',           defaultDone:false },
  { id:'r5', time:'7:30 PM',  dot:'#B5417A', label:'Quick brush',      sub:'Prevent matting',  defaultDone:false },
];

export default function CareScreen() {
  const { theme, dogName } = useStore();
  const [done, setDone] = useState<Set<string>>(new Set(['r1']));
  const [detail, setDetail] = useState<string|null>(null);

  const toggle = (id: string) => setDone(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <div style={{ background: palette.offWhite, minHeight:'100vh', paddingBottom:100 }}>

      {/* Header */}
      <div style={{ background:'#fff', padding:'52px 24px 20px' }}>
        <h1 style={{ fontWeight:900, fontSize:26, color:palette.gray900, margin:0 }}>
          {dogName ? `${dogName}'s care` : "Your dog's care"}
        </h1>
        <p style={{ color:palette.gray400, fontWeight:600, fontSize:15, margin:'4px 0 0' }}>
          Everything in one place
        </p>
      </div>

      <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', gap:20 }}>

        {/* Alert card */}
        <div style={{
          background:'#FAEEDA', border:'1.5px solid #EF9F27',
          borderRadius:18, padding:'16px',
          display:'flex', alignItems:'center', gap:14,
        }}>
          <div style={{ width:40, height:40, borderRadius:12, background:'#EF9F2720', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <IconBell size={22} color='#EF9F27' stroke={2} />
          </div>
          <div style={{ flex:1 }}>
            <p style={{ fontWeight:800, fontSize:15, color:'#92400E', margin:0 }}>Rabies vaccine due in 3 days</p>
            <p style={{ color:'#B45309', fontWeight:600, fontSize:13, margin:'2px 0 0' }}>Book an appointment with your vet</p>
          </div>
          <button style={{
            background:'#EF9F27', color:'#fff', border:'none',
            borderRadius:10, padding:'8px 14px',
            fontWeight:800, fontSize:13, fontFamily:'Nunito', cursor:'pointer', flexShrink:0,
          }}>Book</button>
        </div>

        {/* Health & care grid */}
        <div>
          <p style={{ fontWeight:900, fontSize:18, color:palette.gray900, margin:'0 0 14px' }}>Health & care</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {CARDS.map(card => (
              <button
                key={card.id}
                onClick={() => setDetail(card.id)}
                style={{
                  background:'#fff', border:'1.5px solid #EDD8EA',
                  borderRadius:18, padding:'16px',
                  textAlign:'left', cursor:'pointer',
                  display:'flex', flexDirection:'column', gap:10,
                  boxShadow:'0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ width:40, height:40, borderRadius:11, background:card.iconBg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <card.Icon size={22} color={card.iconColor} stroke={2} />
                </div>
                <div>
                  <p style={{ fontWeight:800, fontSize:14, color:palette.gray900, margin:'0 0 3px', fontFamily:'Nunito' }}>{card.label}</p>
                  <p style={{ fontWeight:700, fontSize:13, color:palette.gray600, margin:'0 0 2px', fontFamily:'Nunito' }}>{card.status}</p>
                  <p style={{ fontWeight:600, fontSize:12, color:palette.gray400, margin:0, fontFamily:'Nunito' }}>{card.next}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Today's routine */}
        <div>
          <p style={{ fontWeight:900, fontSize:18, color:palette.gray900, margin:'0 0 14px' }}>Today's routine</p>
          <div style={{ background:'#fff', borderRadius:20, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
            {ROUTINE.map((item, idx) => {
              const checked = done.has(item.id);
              return (
                <div
                  key={item.id}
                  style={{
                    display:'flex', alignItems:'center', gap:14, padding:'14px 16px',
                    borderBottom: idx < ROUTINE.length-1 ? `1px solid ${palette.gray100}` : 'none',
                    opacity: checked ? 0.6 : 1, transition:'opacity 0.2s',
                  }}
                >
                  <span style={{ fontWeight:700, fontSize:12, color:palette.gray400, width:52, flexShrink:0, fontFamily:'Nunito' }}>{item.time}</span>
                  <div style={{ width:8, height:8, borderRadius:4, background:item.dot, flexShrink:0 }} />
                  <div style={{ flex:1 }}>
                    <p style={{ fontWeight:800, fontSize:14, color:palette.gray900, margin:0, textDecoration: checked ? 'line-through' : 'none', fontFamily:'Nunito' }}>{item.label}</p>
                    <p style={{ fontWeight:600, fontSize:12, color:palette.gray400, margin:0, fontFamily:'Nunito' }}>{item.sub}</p>
                  </div>
                  <button
                    onClick={() => toggle(item.id)}
                    style={{
                      width:28, height:28, borderRadius:14, cursor:'pointer', flexShrink:0,
                      background: checked ? palette.success : '#fff',
                      border: checked ? 'none' : `2px solid ${palette.gray200}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      transition:'all 0.2s',
                    } as React.CSSProperties}
                  >
                    {checked && <IconCheck size={16} color='#fff' stroke={3} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail modal placeholder */}
      {detail && (
        <div
          onClick={() => setDetail(null)}
          style={{
            position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:200,
            display:'flex', alignItems:'flex-end',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background:'#fff', borderRadius:'24px 24px 0 0', padding:'24px', width:'100%', maxWidth:430, margin:'0 auto' }}
          >
            {(() => { const c = CARDS.find(c => c.id === detail)!; return (
              <>
                <div style={{ width:48, height:4, borderRadius:2, background:palette.gray200, margin:'0 auto 20px' }} />
                <div style={{ display:'flex', gap:14, alignItems:'center', marginBottom:20 }}>
                  <div style={{ width:52, height:52, borderRadius:14, background:c.iconBg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <c.Icon size={28} color={c.iconColor} stroke={2} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight:900, fontSize:20, margin:0 }}>{c.label}</h3>
                    <p style={{ color:palette.gray400, fontSize:14, fontWeight:600, margin:0 }}>{c.status}</p>
                  </div>
                </div>
                <p style={{ color:palette.gray600, fontWeight:600, fontSize:15, marginBottom:24 }}>{c.next}</p>
                <button
                  onClick={() => setDetail(null)}
                  style={{
                    width:'100%', background:theme.primary, color:'#fff', border:'none',
                    borderRadius:16, padding:'16px', fontWeight:900, fontSize:16,
                    fontFamily:'Nunito', cursor:'pointer',
                  }}
                >Edit record →</button>
              </>
            );})()}
          </div>
        </div>
      )}
    </div>
  );
}
