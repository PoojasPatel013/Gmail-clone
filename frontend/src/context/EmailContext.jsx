import React, { createContext, useContext, useState, useEffect } from 'react';

const EmailContext = createContext();

export function EmailProvider({ children }) {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [currentCategory, setCurrentCategory] = useState('primary');

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/emails');
      const data = await response.json();
      setEmails(data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

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

  const toggleStarred = async (id) => {
    try {
      await fetch('http://localhost:3001/api/emails/toggle-star', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchEmails();
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  };

  const markAsRead = async (ids) => {
    try {
      await fetch('http://localhost:3001/api/emails/mark-as-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      });
      fetchEmails();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const deleteEmails = async (ids) => {
    try {
      await fetch('http://localhost:3001/api/emails/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      });
      fetchEmails();
      setSelectedEmails(new Set());
    } catch (error) {
      console.error('Error deleting emails:', error);
    }
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