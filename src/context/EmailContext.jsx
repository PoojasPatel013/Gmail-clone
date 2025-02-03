import React, { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

const initialEmails = [
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
  // Add more sample emails here
];

export function EmailProvider({ children }) {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [currentCategory, setCurrentCategory] = useState('primary');

  const toggleEmailSelection = (id) => {
    setSelectedEmails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleStarred = (id) => {
    setEmails(prev => 
      prev.map(email => 
        email.id === id ? { ...email, starred: !email.starred } : email
      )
    );
  };

  const markAsRead = (ids) => {
    setEmails(prev => 
      prev.map(email => 
        ids.includes(email.id) ? { ...email, read: true } : email
      )
    );
  };

  const deleteEmails = (ids) => {
    setEmails(prev => prev.filter(email => !ids.includes(email.id)));
    setSelectedEmails(new Set());
  };

  const setCategory = (category) => {
    setCurrentCategory(category);
    setSelectedEmails(new Set());
  };

  const selectAllEmails = () => {
    const visibleEmails = emails
      .filter(email => email.category === currentCategory)
      .map(email => email.id);
    setSelectedEmails(new Set(visibleEmails));
  };

  const deselectAllEmails = () => {
    setSelectedEmails(new Set());
  };

  return (
    <EmailContext.Provider value={{
      emails,
      selectedEmails,
      currentCategory,
      toggleEmailSelection,
      toggleStarred,
      markAsRead,
      deleteEmails,
      setCategory,
      selectAllEmails,
      deselectAllEmails
    }}>
      {children}
    </EmailContext.Provider>
  );
}

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};
