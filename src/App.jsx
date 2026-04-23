import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import './App.css';

const COMPETITION_DATE = new Date('2026-04-26T18:00:00');

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calc = () => {
      const diff = COMPETITION_DATE - new Date();
      if (diff <= 0) return setTimeLeft({ done: true });
      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

function AddUser() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [memberId, setMemberId] = useState('');

  const [users, setUsers] = useState([]);
  const [showData, setShowData] = useState(false);
  const [status, setStatus] = useState(null);
  const [loadingInsert, setLoadingInsert] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const fetchUsers = async () => {
    setLoadingFetch(true);
    const { data, error } = await supabase.from('users_data').select('*');
    setLoadingFetch(false);
    if (error) {
      setStatus({ type: 'error', message: 'Failed to fetch data' });
    } else {
      setUsers(data);
      setShowData(true);
    }
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !memberId.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }
    setLoadingInsert(true);
    setStatus(null);

    const { error } = await supabase
      .from('users_data')
      .insert([{ name: name.trim(), phone_number: phone.trim(), member_id: memberId.trim() }]);

    setLoadingInsert(false);
    if (error) {
      setStatus({ type: 'error', message: 'Failed to add user' });
    } else {
      setStatus({ type: 'success', message: 'User added successfully' });
      setName('');
      setPhone('');
      setMemberId('');

      if (showData) fetchUsers();
    }
  };

  const timeLeft = useCountdown();

  return (
    <div className="app-container">
      <img src="/bigLogo.png" alt="XGym Logo" className="top-logo" />

      {/* ── Countdown Timer ── */}
      <div className="countdown-wrapper">
        <p className="countdown-label">Competition starts in</p>
        {timeLeft.done ? (
          <p className="countdown-done">🏆 Competition Day!</p>
        ) : (
          <div className="countdown-grid">
            <div className="countdown-block">
              <span className="countdown-num">{String(timeLeft.days).padStart(2,'0')}</span>
              <span className="countdown-unit">Days</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-block">
              <span className="countdown-num">{String(timeLeft.hours).padStart(2,'0')}</span>
              <span className="countdown-unit">Hours</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-block">
              <span className="countdown-num">{String(timeLeft.minutes).padStart(2,'0')}</span>
              <span className="countdown-unit">Minutes</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-block">
              <span className="countdown-num">{String(timeLeft.seconds).padStart(2,'0')}</span>
              <span className="countdown-unit">Seconds</span>
            </div>
          </div>
        )}
        <p className="countdown-date">Sunday, April 26 · 2026 · 6:00 PM</p>
      </div>

      {/* ── Competition Details ── */}
      <div className="comp-section">
        <h1 className="comp-main-title">Competition Details</h1>

        <div className="comp-grid">
          {/* Exercises */}
          <div className="card comp-card">
            <div className="comp-card-header men">
              <span className="comp-icon">💪</span>
              <h2>Exercise — Men</h2>
            </div>
            <ol className="comp-list">
              <li>Push ups</li>
              <li>Pull ups</li>
              <li>Dips</li>
              <li>Wall sit</li>
              <li>Plank</li>
            </ol>
          </div>

          <div className="card comp-card">
            <div className="comp-card-header girls">
              <span className="comp-icon">🏋️</span>
              <h2>Exercise — Girls</h2>
            </div>
            <ol className="comp-list">
              <li>Row machine</li>
              <li>Step ups</li>
              <li>Squat</li>
              <li>Plank</li>
              <li>Battle ropes</li>
            </ol>
          </div>

          {/* Prizes */}
          <div className="card comp-card">
            <div className="comp-card-header men">
              <span className="comp-icon">🥇</span>
              <h2>Prizes — Men</h2>
            </div>
            <ul className="prize-list">
              <li><span className="medal gold">1st</span> 1 Carb + 1 Creatine + Shaker</li>
              <li><span className="medal silver">2nd</span> 1 Creatine + Protein Scoop + Bag</li>
              <li><span className="medal bronze">3rd</span> Protein Scoop + Pull-up Bar</li>
            </ul>
          </div>

          <div className="card comp-card">
            <div className="comp-card-header girls">
              <span className="comp-icon">🥇</span>
              <h2>Prizes — Girls</h2>
            </div>
            <ul className="prize-list">
              <li><span className="medal gold">1st</span> 1 Carb + 1 Creatine + Shaker</li>
              <li><span className="medal silver">2nd</span> 1 Creatine + Protein Scoop + Bag</li>
              <li><span className="medal bronze">3rd</span> Protein Scoop + Pull-up Bar</li>
            </ul>
          </div>
        </div>

        {/* Sponsors */}
        <div className="card sponsors-card">
          <h2 className="sponsors-title">🎁 Competition Prizes Sponsored By</h2>
          <div className="sponsors-list">
            <div className="sponsor-item">
              <span className="sponsor-name">NPP Supplements</span>
              <span className="sponsor-detail">2 Carb · 2 Creatine</span>
            </div>
            <div className="sponsor-divider" />
            <div className="sponsor-item">
              <span className="sponsor-name">Bulk Supplements</span>
              <span className="sponsor-detail">2 Creatine · Protein Scoop</span>
            </div>
            <div className="sponsor-divider" />
            <div className="sponsor-item">
              <span className="sponsor-name">Fulex Food</span>
              <span className="sponsor-detail">Testing Food</span>
            </div>
            <div className="sponsor-divider" />
            <div className="sponsor-item">
              <span className="sponsor-name">Extras</span>
              <span className="sponsor-detail">Shakers · Pull-up Bars · Bags (2–3 of each)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Registration ── */}
      <h1 className="app-title">Registration</h1>

      <div className="card">
        <h2>Add New User</h2>
        <form onSubmit={handleInsert} className="user-form">
          <div className="input-group">
            <label htmlFor="name-input">Name</label>
            <input
              id="name-input"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone-input">Phone Number</label>
            <input
              id="phone-input"
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="member-id-input">Member ID</label>
            <input
              id="member-id-input"
              type="text"
              placeholder="Enter member ID"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="form-input"
            />
          </div>

          {status && (
            <div className={`status-banner ${status.type}`} role="alert">
              {status.type === 'success' ? '✓ ' : '✕ '}
              {status.message}
            </div>
          )}

          <div className="button-row">
            <button type="submit" className="btn btn-primary" disabled={loadingInsert}>
              {loadingInsert ? (
                <><span className="spinner" /> Uploading...</>
              ) : 'Submit'}
            </button>
            {/* <button
              type="button"
              className="btn btn-secondary"
              onClick={fetchUsers}
              disabled={loadingFetch}
            >
              {loadingFetch ? (
                <><span className="spinner spinner-accent" /> Loading...</>
              ) : 'Show Data'}
            </button> */}
          </div>
        </form>
      </div>

      {showData && (
        <div className="card table-card">
          <div className="table-header">
            <h2>
              Users List
              <span className="count">{users.length}</span>
            </h2>
            <button className="btn btn-ghost" onClick={fetchUsers} disabled={loadingFetch}>
              {loadingFetch ? '...' : '↻ Refresh'}
            </button>
          </div>

          {users.length === 0 ? (
            <p className="empty-state">No users found</p>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user.id}>
                      <td className="row-num">{i + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.phone_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddUser;
