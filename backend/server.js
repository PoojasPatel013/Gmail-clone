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
    category: 'primary',
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
    category: 'social',
    labels: ['jobs']
  },
  {
    id: 3,
    sender: 'Amazon',
    subject: 'Your order has been shipped',
    preview: 'Your package is on its way! Expected delivery...',
    time: '1:15 PM',
    read: false,
    starred: false,
    category: 'promotions',
    labels: ['shopping']
  },
];

app.get('/api/emails', (req, res) => {
  res.json(emails);
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