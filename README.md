# WhatsApp Business API Interface

A simple TypeScript library for WhatsApp Business Cloud API.

## Installation

```bash
npm install @a7medalhadi/waba-interface
```

## Quick Start

```typescript
import { WABA } from '@a7medalhadi/waba-interface';

const waba = new WABA({
  token: 'your-access-token',
  numberId: 'your-phone-number-id',
  wabaId: 'your-waba-id'
});

// Send a text message
await waba.messages.sendTextMessage({
  to: '1234567890',
  text: { body: 'Hello!' }
});
```

## Features

### Messages

```typescript
// Text
await waba.messages.sendTextMessage({
  to: '1234567890',
  text: { body: 'Hello!' }
});

// Media (image, video, document)
await waba.messages.sendMediaMessage({
  to: '1234567890',
  media: {
    type: 'image',
    image: { link: 'https://example.com/image.jpg' }
  }
});

// Interactive buttons
await waba.messages.sendReplyButtonMessage({
  to: '1234567890',
  interactive: {
    type: 'button',
    body: { text: 'Choose an option' },
    action: {
      buttons: [
        { type: 'reply', reply: { id: 'yes', title: 'Yes' } }
      ]
    }
  }
});

// Template
await waba.messages.sendTemplateMessage({
  to: '1234567890',
  template: {
    name: 'template_name',
    language: { code: 'en' }
  }
});
```

### Templates

```typescript
// List templates
const templates = await waba.templates.getTemplates({ limit: 10 });

// Get specific template
const template = await waba.templates.getTemplate('template-id');
```

### Media

```typescript
// Upload
await waba.media.uploadMedia({ file: buffer, type: 'image/jpeg' });

// Get URL
await waba.media.getMediaUrl({ media_id: 'id' });
```

### Flows

```typescript
await waba.flows.createFlow({ name: 'My Flow', categories: ['SIGN_UP'] });
await waba.flows.publishFlow({ flowId: 'flow-id' });
```

## Get Credentials

From [Meta for Developers](https://developers.facebook.com/apps):
- **token**: Access token
- **numberId**: Phone number ID
- **wabaId**: WhatsApp Business Account ID

## License

MIT
