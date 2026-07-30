# GLOBAL CONTROL CENTRE CRM INTEGRATION
## Revora Life — Week 2 Implementation Plan

---

## Overview

**CRM Platform:** Global Control Centre (GCC)  
**Integration Type:** Web form → GCC API  
**Timeline:** Week 2 (Days 8-14)  
**Status:** Planning Phase

---

## GCC Research Required

### Information Needed from Eric

1. **GCC API Documentation**
   - API endpoint URL
   - Authentication method (API key, OAuth, etc.)
   - Data format (JSON, XML, etc.)
   - Rate limits

2. **Required Fields**
   - What contact fields does GCC require?
   - Custom fields for Revora Life?
   - Lead source tracking?

3. **Lead Scoring**
   - Does GCC have built-in lead scoring?
   - Scoring criteria?
   - Automation triggers?

4. **Integration Method**
   - Direct API integration?
   - Webhook?
   - Third-party connector (Zapier, Make)?

---

## Proposed Integration Architecture

### Option A: Direct API Integration (Preferred)

```
Website Form
    ↓
JavaScript Validation
    ↓
API Call to GCC
    ↓
GCC Creates Contact
    ↓
Confirmation to User
    ↓
Notification to Sales Team
```

**Pros:**
- Real-time sync
- No middleware
- Full control

**Cons:**
- Requires API access
- Development time

---

### Option B: Webhook Integration

```
Website Form → Formspree
    ↓
Formspree Webhook
    ↓
GCC Receives Data
    ↓
GCC Creates Contact
```

**Pros:**
- Simple setup
- Uses existing Formspree

**Cons:**
- Dependency on Formspree
- Less control

---

### Option C: Third-Party Connector

```
Website Form → Zapier/Make
    ↓
Zapier/Make Process
    ↓
GCC Integration
```

**Pros:**
- No-code solution
- Easy to modify

**Cons:**
- Additional cost
- Another platform to manage

---

## Data Mapping

### Website Form Fields → GCC Contact Fields

| Website Field | GCC Field | Required |
|---------------|-----------|----------|
| Name | First Name, Last Name | Yes |
| Email | Email | Yes |
| Phone | Phone | No |
| Interest | Lead Source / Tag | Yes |
| Message | Notes / Description | No |
| Page URL | Lead Source Detail | Auto |
| Timestamp | Created Date | Auto |
| UTM Parameters | Campaign Tracking | Auto |

### Custom Fields for Revora Life

| Field Name | Type | Purpose |
|------------|------|---------|
| Interest_Category | Dropdown | Product, Consultation, Support |
| Lead_Magnet | Text | Which resource downloaded |
| Consultation_Booked | Date | If/when booked |
| Product_Interest | Multi-select | Full-body, Localized, Professional |
| Wellness_Goals | Text | Sleep, Recovery, Energy, etc. |

---

## Implementation Steps

### Step 1: GCC Setup (Day 8)
- [ ] Confirm GCC account access
- [ ] Review API documentation
- [ ] Create custom fields
- [ ] Set up lead source tracking
- [ ] Configure notification rules

### Step 2: Form Integration (Day 9-10)
- [ ] Update contact form HTML
- [ ] Add JavaScript validation
- [ ] Implement API call
- [ ] Add error handling
- [ ] Test form submission

### Step 3: Testing (Day 11)
- [ ] Submit test leads
- [ ] Verify data in GCC
- [ ] Check field mapping
- [ ] Test error scenarios
- [ ] Confirm notifications

### Step 4: Lead Scoring (Day 12)
- [ ] Define scoring criteria
- [ ] Configure in GCC
- [ ] Set up automation rules
- [ ] Test scoring logic

### Step 5: Automation (Day 13)
- [ ] Welcome email trigger
- [ ] Lead assignment rules
- [ ] Follow-up task creation
- [ ] Notification workflows

### Step 6: Documentation (Day 14)
- [ ] Integration documentation
- [ ] User guide for team
- [ ] Troubleshooting guide
- [ ] Handover to operations

---

## Form Code Structure

```html
<form id="contact-form" action="/api/submit-to-gcc" method="POST">
  <div class="form-group">
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div class="form-group">
    <label for="phone">Phone</label>
    <input type="tel" id="phone" name="phone">
  </div>
  
  <div class="form-group">
    <label for="interest">I'm interested in *</label>
    <select id="interest" name="interest" required>
      <option value="">Select...</option>
      <option value="consultation">Free Consultation</option>
      <option value="full_body">Full-Body Systems</option>
      <option value="localized">Localized Devices</option>
      <option value="professional">Professional Systems</option>
      <option value="general">General Enquiry</option>
    </select>
  </div>
  
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message"></textarea>
  </div>
  
  <!-- Hidden fields for tracking -->
  <input type="hidden" name="page_url" id="page_url">
  <input type="hidden" name="utm_source" id="utm_source">
  <input type="hidden" name="utm_medium" id="utm_medium">
  <input type="hidden" name="utm_campaign" id="utm_campaign">
  
  <button type="submit" class="button button-primary">Send Message</button>
</form>

<script>
// Populate hidden fields
document.getElementById('page_url').value = window.location.href;

// Get UTM parameters from URL
const urlParams = new URLSearchParams(window.location.search);
document.getElementById('utm_source').value = urlParams.get('utm_source') || '';
document.getElementById('utm_medium').value = urlParams.get('utm_medium') || '';
document.getElementById('utm_campaign').value = urlParams.get('utm_campaign') || '';

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch('/api/submit-to-gcc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      // Show success message
      showSuccessMessage();
      // Track conversion
      gtag('event', 'form_submit', { event_category: 'lead', value: 1 });
    } else {
      showErrorMessage();
    }
  } catch (error) {
    showErrorMessage();
  }
});
</script>
```

---

## API Endpoint (Serverless Function)

```javascript
// /api/submit-to-gcc.js
// Vercel Serverless Function

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, interest, message, page_url, utm_source, utm_medium, utm_campaign } = req.body;

  // Split name into first and last
  const nameParts = name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || '';

  // Prepare data for GCC
  const gccData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    source: 'Website',
    lead_source_detail: interest,
    notes: message,
    page_url: page_url,
    utm_source: utm_source,
    utm_medium: utm_medium,
    utm_campaign: utm_campaign,
    custom_fields: {
      interest_category: interest,
      consultation_booked: false
    }
  };

  try {
    // Send to GCC API
    const gccResponse = await fetch('https://api.globalcontrolcentre.com/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GCC_API_KEY}`
      },
      body: JSON.stringify(gccData)
    });

    if (gccResponse.ok) {
      return res.status(200).json({ success: true });
    } else {
      const error = await gccResponse.text();
      console.error('GCC API error:', error);
      return res.status(500).json({ error: 'Failed to create contact' });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

---

## Environment Variables Needed

```
GCC_API_KEY=your_api_key_here
GCC_API_URL=https://api.globalcontrolcentre.com/v1
```

---

## Success Metrics

### Integration Success
- [ ] Form submissions create GCC contacts
- [ ] All fields map correctly
- [ ] No data loss
- [ ] Error handling works
- [ ] Notifications sent

### Business Success
- [ ] 100% of leads captured in GCC
- [ ] Lead response time < 2 hours
- [ ] Lead scoring functional
- [ ] Automation workflows active

---

## Next Steps Required

**From Eric:**
1. Provide GCC API documentation
2. Confirm API key/access method
3. Review custom field requirements
4. Approve integration approach

**From Mr WOW:**
1. Implement chosen integration method
2. Test thoroughly
3. Document for team
4. Train on usage

---

*GCC Integration Plan created for Week 2 implementation.*
*Awaiting API documentation from Eric to proceed.*
