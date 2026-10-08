import React, { useState } from 'react';
import { Users, Calendar, MessageCircle, Plus, ChevronRight, UserCheck, UserMinus } from 'lucide-react';

const SEED_COMMUNITIES = [
  {
    id: 'comm-1',
    name: 'Hubballi Women Entrepreneurs',
    description: 'Connect with women business owners across Hubballi-Dharwad. Share challenges, ideas, and opportunities.',
    category: 'General',
    members: 312,
    icon: '🌸',
    events: [
      { id: 'evt-1', title: 'How to market your home business', speaker: 'Priya Deshpande (Digital Marketer)', date: '2026-10-18', time: '5:30 PM', location: 'TiE Hubballi Office, Vidyanagar' },
      { id: 'evt-2', title: 'Understanding digital payments & UPI', speaker: 'CA Rekha Kulkarni', date: '2026-10-25', time: '4:00 PM', location: 'Zoom (Online)' }
    ],
    discussions: [
      { id: 'd1', author: 'Anitha S.', text: 'Any tips for packaging Deepavali sweets for delivery?', time: '2h ago', replies: 7 },
      { id: 'd2', author: 'Meena K.', text: 'Found a great supplier for food-grade packaging in Dharwad.', time: '5h ago', replies: 3 }
    ]
  },
  {
    id: 'comm-2',
    name: 'Home Food Businesses',
    description: 'For home chefs, tiffin services, and catering businesses of Hubballi-Dharwad.',
    category: 'Food',
    members: 187,
    icon: '🍱',
    events: [
      { id: 'evt-3', title: 'How to price your food products correctly', speaker: 'Usha Bhat (Food Entrepreneur)', date: '2026-11-02', time: '6:00 PM', location: 'Online' }
    ],
    discussions: [
      { id: 'd3', author: 'Lakshmi P.', text: 'Sharing my experience with same-day delivery for tiffin orders.', time: '1d ago', replies: 12 }
    ]
  },
  {
    id: 'comm-3',
    name: 'Kasuti & Handloom Entrepreneurs',
    description: 'Supporting women preserving traditional Dharwad Kasuti embroidery and Ilkal weaving.',
    category: 'Handicrafts',
    members: 94,
    icon: '🧵',
    events: [
      { id: 'evt-4', title: 'GI Tag and IP protection for Kasuti artisans', speaker: 'Advocate Sunita Rao', date: '2026-11-10', time: '3:00 PM', location: 'Keshwapur Community Hall' }
    ],
    discussions: [
      { id: 'd4', author: 'Shobha H.', text: 'How do you handle bulk orders from Bangalore boutiques?', time: '3d ago', replies: 5 }
    ]
  },
  {
    id: 'comm-4',
    name: 'Home Bakers',
    description: 'A supportive network for home bakers — from eggless cakes to artisan bread.',
    category: 'Baking',
    members: 143,
    icon: '🎂',
    events: [
      { id: 'evt-5', title: 'How to run Instagram ads for your bakery', speaker: 'Rohit Sharma (Meta Partner)', date: '2026-11-15', time: '6:30 PM', location: 'Online' }
    ],
    discussions: [
      { id: 'd5', author: 'Anu K.', text: 'Anyone here does eggless cheesecakes? Looking for recipe tips.', time: '6h ago', replies: 9 }
    ]
  },
  {
    id: 'comm-5',
    name: 'Young Women Entrepreneurs',
    description: 'For women under 35 starting their first business. Mentorship, support, and growth.',
    category: 'General',
    members: 218,
    icon: '⭐',
    events: [
      { id: 'evt-6', title: 'How to access business finance', speaker: 'Sneha Joshi (SIDBI)', date: '2026-11-20', time: '5:00 PM', location: 'Dharwad District Commerce Office' },
      { id: 'evt-7', title: 'Women Entrepreneurs Networking Evening', speaker: 'Multiple Speakers', date: '2026-12-05', time: '5:30 PM', location: 'Hotel Naveen, Hubballi' }
    ],
    discussions: [
      { id: 'd6', author: 'Pooja M.', text: 'Just got my first 10 orders! Thank you all for the support 🙏', time: '1d ago', replies: 18 }
    ]
  }
];

export default function CommunitySection() {
  const storageKey = 'ns_community_joined';
  const [joined, setJoined] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
  });
  const [selected, setSelected] = useState(null);

  const toggleJoin = (commId) => {
    const next = joined.includes(commId)
      ? joined.filter(id => id !== commId)
      : [...joined, commId];
    setJoined(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const isJoined = (id) => joined.includes(id);

  if (selected) {
    const comm = SEED_COMMUNITIES.find(c => c.id === selected);
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.8125rem', marginBottom: '1rem', padding: 0 }}>
          ← Back to Communities
        </button>

        {/* Community Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ fontSize: '2rem' }}>{comm.icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>{comm.name}</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{comm.description}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>
                <Users size={12} style={{ display: 'inline', marginRight: 4 }} />
                {comm.members + (isJoined(comm.id) ? 1 : 0)} members
              </div>
            </div>
          </div>
          <button
            onClick={() => toggleJoin(comm.id)}
            className={`btn btn-sm ${isJoined(comm.id) ? 'btn-secondary' : 'btn-primary'}`}
          >
            {isJoined(comm.id) ? <><UserMinus size={13} /><span>Leave</span></> : <><UserCheck size={13} /><span>Join</span></>}
          </button>
        </div>

        {/* Events */}
        {comm.events.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={14} color="var(--accent)" /> Upcoming Events
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {comm.events.map(evt => (
                <div key={evt.id} style={{ padding: '0.875rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: '#fff' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>{evt.title}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>👤 {evt.speaker}</div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.775rem', color: 'var(--text-subtle)' }}>
                    <span>📅 {new Date(evt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>🕐 {evt.time}</span>
                    <span>📍 {evt.location}</span>
                  </div>
                  <button className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem' }}>Register Interest</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discussions */}
        {comm.discussions.length > 0 && (
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MessageCircle size={14} color="var(--accent)" /> Discussions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {comm.discussions.map(d => (
                <div key={d.id} style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{d.author}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>{d.time}</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{d.text}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent)', marginTop: '0.3rem' }}>{d.replies} replies</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.75rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Join the community to participate in discussions →
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* My communities */}
      {joined.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.5rem' }}>Your Communities ({joined.length})</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {joined.map(id => {
              const c = SEED_COMMUNITIES.find(x => x.id === id);
              return c ? (
                <button key={id} onClick={() => setSelected(id)}
                  style={{ padding: '0.3rem 0.6rem', background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                  {c.icon} {c.name}
                </button>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* All communities */}
      <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.75rem' }}>All Communities</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {SEED_COMMUNITIES.map(comm => (
          <div key={comm.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: '#fff' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{comm.icon}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)' }}>{comm.name}</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: '0.15rem' }} >{comm.description}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
                  <Users size={11} style={{ display: 'inline', marginRight: 3 }} />
                  {comm.members + (isJoined(comm.id) ? 1 : 0)} members
                  {comm.events.length > 0 && <span style={{ marginLeft: '0.5rem' }}>• {comm.events.length} upcoming event{comm.events.length > 1 ? 's' : ''}</span>}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, marginLeft: '0.75rem' }}>
              <button onClick={() => setSelected(comm.id)} className="btn btn-secondary btn-sm">
                <ChevronRight size={13} />
              </button>
              <button onClick={() => toggleJoin(comm.id)} className={`btn btn-sm ${isJoined(comm.id) ? 'btn-secondary' : 'btn-primary'}`}>
                {isJoined(comm.id) ? 'Leave' : 'Join'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
