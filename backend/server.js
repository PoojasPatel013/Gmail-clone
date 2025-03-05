import express, { json } from 'express';
import cors from 'cors';
const app = express();
const port = 3001;

app.use(cors());
app.use(json());

let emails = [
  {
    id: 1,
    sender: 'GitHub',
    subject: 'Your repository has been starred',
    preview: 'Someone starred your repository "gmail-clone"...',
    time: '10:30 AM',
    read: false,
    starred: false,
    category: 'social',
    labels: ['github', 'notifications']
  },
  {
    id: 2,
    sender: 'LinkedIn',
    subject: 'New job opportunities matching your profile',
    preview: 'We found 5 new jobs that match your preferences...',
    time: '11:45 AM',
    read: true,
    starred: true,
    category: 'primary',
    labels: ['jobs']
  },
  {
    id: 3,
    sender: 'Amazon',
    subject: 'Pooja, Your order has been shipped we will reach out soon',
    preview: 'Your package is on its way! Expected delivery...',
    time: '1:15 PM',
    read: false,
    starred: false,
    category: 'promotions',
    labels: ['shopping']
  },
  {
    id: 4,
    sender: 'Indeed',
    subject: 'Your appliaction has been submitted',
    preview: 'Pooja, You have applied in a job fair, your resume has passed round 1. We look forward to see you shortlist.',
    time: '12:05 PM',
    read: false,
    starred: false,
    category: 'social',
    labels: ['jobs']
  },
  {
    id: 4,
    sender: 'ITC',
    subject: 'Your appliaction has been submitted',
    preview: 'Pooja, You have applied in a job fair, your resume has passed round 1. We look forward to see you shortlist.',
    time: '12:05 PM',
    read: false,
    starred: false,
    category: 'primary',
    labels: ['careers']
  },
  {
    id: 5,
    sender: 'Intel',
    subject: 'Your appliaction has been submitted',
    preview: 'Miss Pooja Patel, You have applied in our training program.',
    time: '10:00 PM',
    read: false,
    starred: false,
    category: 'primary',
    labels: ['jobs']
  },
  {
    id: 6,
    sender: 'ITC',
    subject: 'We welcome you in our ITC family',
    preview: 'Hey Pooja, You have been selected for interview.',
    time: '9:00 AM',
    read: false,
    starred: false,
    category: 'primary',
    labels: ['careers']
  }
];

app.get('/api/emails', (req, res) => {
  res.json(emails);
});
app.get('/api/emails/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const email = emails.find(email => email.id === id);
  if (email) {
    res.json(email);
  } else {
    res.status(404).json({ error: 'Email not found' });
  }
});

app.post('/api/emails/toggle-star', (req, res) => {
  const { id } = req.body;
  emails = emails.map(email => 
    email.id === id ? { ...email, starred: !email.starred } : email
  );
  res.json({ success: true });
});

app.post('/api/emails/mark-as-read', (req, res) => {
  const { ids } = req.body;
  emails = emails.map(email => 
    ids.includes(email.id) ? { ...email, read: true } : email
  );
  res.json({ success: true });
});

app.post('/api/emails/delete', (req, res) => {
  const { ids } = req.body;
  emails = emails.filter(email => !ids.includes(email.id));
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});