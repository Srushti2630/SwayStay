import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Avatar } from '@mui/material';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const GroupChat: React.FC<{ groupId: string; userId: string }> = ({ groupId, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock initial messages
    const initialMessages: Message[] = [
      {
        id: '1',
        sender: 'Alex',
        content: 'Hey everyone! Ready for our eco-trip?',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        sender: 'Jordan',
        content: 'Yes! I found a great sustainable hotel',
        timestamp: new Date(Date.now() - 1800000)
      }
    ];
    setMessages(initialMessages);
  }, [groupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: userId,
        content: newMessage,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, message]);
      setNewMessage('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '500px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Group Chat
      </Typography>
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        <List>
          {messages.map((msg) => (
            <ListItem key={msg.id} alignItems="flex-start">
              <Avatar sx={{ bgcolor: stringToColor(msg.sender), mr: 2 }}>
                {msg.sender.charAt(0).toUpperCase()}
              </Avatar>
              <ListItemText
                primary={msg.sender}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {msg.content}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      {msg.timestamp.toLocaleTimeString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ ml: 2 }}
          disabled={!newMessage.trim()}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export default GroupChat;