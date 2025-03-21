import { API_URL } from '../services/config';


// 📌 Работа с комнатами
export const getRooms = async () => {
  try {
    const response = await fetch(`${API_URL}/rooms`);
    if (!response.ok) {
      throw new Error(`Ошибка получения комнат: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при запросе комнат:", error);
    return [];
  }
};

export const testApiConnection = async () => {
  try {
    console.log("Тест API-запроса...");
    const response = await fetch("https://kursovaya-ryzhov.ru/api/rooms", { 
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    console.log("Ответ сервера:", response);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка API: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Данные от API:", data);
  } catch (error) {
    console.error("Ошибка API:", error);
  }
};


  

export const createRoom = async (name, theme) => {
  try {
    const response = await fetch(`${API_URL}/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, theme }),
    });
    return await response.json();
  } catch (error) {
    console.error('Ошибка создания комнаты:', error);
    return null;
  }
};

export const deleteRoom = async (roomId) => {
  try {
    await fetch(`${API_URL}/rooms/${roomId}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Ошибка удаления комнаты:', error);
  }
};

// 📌 Работа с задачами
export const getTasks = async (roomId) => {
  try {
    const response = await fetch(`${API_URL}/tasks?roomId=${roomId}`);
    return await response.json();
  } catch (error) {
    console.error('Ошибка получения задач:', error);
    return [];
  }
};

export const createTask = async (columnId, text) => {
    try {
      const requestBody = { column_id: columnId, text };
      console.log("Отправка запроса createTask:", requestBody);
  
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка создания задачи: ${response.status} ${response.statusText} - ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
      return null;
    }
  };
  

export const deleteTask = async (taskId) => {
  try {
    await fetch(`${API_URL}/tasks/${taskId}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Ошибка удаления задачи:', error);
  }
};

// 📌 Работа с записями
export const getEntries = async (roomId) => {
  try {
    const response = await fetch(`${API_URL}/entries?roomId=${roomId}`);
    return await response.json();
  } catch (error) {
    console.error('Ошибка получения записей:', error);
    return [];
  }
};

export const createEntry = async (roomId, content) => {
  try {
    const response = await fetch(`${API_URL}/entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room_id: roomId, content }),
    });
    return await response.json();
  } catch (error) {
    console.error('Ошибка создания записи:', error);
    return null;
  }
};

export const deleteEntry = async (entryId) => {
  try {
    await fetch(`${API_URL}/entries/${entryId}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Ошибка удаления записи:', error);
  }
};

export const createColumn = async (roomId, title) => {
    try {
      const requestBody = { room_id: roomId, title };
      console.log("Отправка запроса createColumn:", requestBody);
  
      const response = await fetch(`${API_URL}/columns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка создания колонки: ${response.status} ${response.statusText} - ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Ошибка при создании колонки:", error);
      return null;
    }
  };
  
  


  export const getColumns = async (roomId) => {
    try {
      const response = await fetch(`${API_URL}/columns?roomId=${roomId}`);
      if (!response.ok) {
        throw new Error(`Ошибка получения колонок: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при запросе колонок:", error);
      return [];
    }
  };
  