const http = require('http');

let todos = [];
let nextId = 1;

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : null);
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function matchRoute(pathname) {
  const list = /^\/todos\/?$/;
  const single = /^\/todos\/(\d+)\/?$/;

  if (list.test(pathname)) return { type: 'list' };
  const m = pathname.match(single);
  if (m) return { type: 'single', id: parseInt(m[1], 10) };
  return null;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const route = matchRoute(url.pathname);
    const method = req.method;

    if (!route) {
      sendJSON(res, 404, { error: 'Not Found' });
      return;
    }

    switch (method) {
      case 'GET': {
        if (route.type === 'list') {
          sendJSON(res, 200, todos);
        } else {
          const todo = todos.find(t => t.id === route.id);
          if (!todo) {
            sendJSON(res, 404, { error: 'Todo not found' });
            return;
          }
          sendJSON(res, 200, todo);
        }
        break;
      }

      case 'POST': {
        if (route.type !== 'list') {
          sendJSON(res, 405, { error: 'Method Not Allowed' });
          return;
        }
        const body = await parseBody(req);
        if (!body || !body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
          sendJSON(res, 400, { error: 'Title is required' });
          return;
        }
        const todo = {
          id: nextId++,
          title: body.title.trim(),
          completed: body.completed === true
        };
        todos.push(todo);
        sendJSON(res, 201, todo);
        break;
      }

      case 'PUT': {
        if (route.type !== 'single') {
          sendJSON(res, 405, { error: 'Method Not Allowed' });
          return;
        }
        const body = await parseBody(req);
        if (!body) {
          sendJSON(res, 400, { error: 'Invalid JSON' });
          return;
        }
        const idx = todos.findIndex(t => t.id === route.id);
        if (idx === -1) {
          sendJSON(res, 404, { error: 'Todo not found' });
          return;
        }
        const updates = {};
        if (body.title !== undefined) {
          if (typeof body.title !== 'string' || body.title.trim().length === 0) {
            sendJSON(res, 400, { error: 'Title must be a non-empty string' });
            return;
          }
          updates.title = body.title.trim();
        }
        if (body.completed !== undefined) {
          if (typeof body.completed !== 'boolean') {
            sendJSON(res, 400, { error: 'completed must be a boolean' });
            return;
          }
          updates.completed = body.completed;
        }
        if (Object.keys(updates).length === 0) {
          sendJSON(res, 400, { error: 'No valid fields to update' });
          return;
        }
        todos[idx] = { ...todos[idx], ...updates };
        sendJSON(res, 200, todos[idx]);
        break;
      }

      case 'DELETE': {
        if (route.type !== 'single') {
          sendJSON(res, 405, { error: 'Method Not Allowed' });
          return;
        }
        const idx = todos.findIndex(t => t.id === route.id);
        if (idx === -1) {
          sendJSON(res, 404, { error: 'Todo not found' });
          return;
        }
        const deleted = todos.splice(idx, 1)[0];
        sendJSON(res, 200, deleted);
        break;
      }

      default:
        sendJSON(res, 405, { error: 'Method Not Allowed' });
    }
  } catch (err) {
    sendJSON(res, 500, { error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});