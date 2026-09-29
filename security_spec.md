# Security Specification & Threat Model

## 1. Data Invariants

1. **Site Configuration Security (`/sites/{siteId}`)**:
   - Publicly readable so visitors and prospective clients can view the website.
   - Writable only by authenticated administrators (`request.auth != null`).
   - All string fields are strictly bound with `.size() <= MAX` to prevent resource poisoning.
   - `updatedAt` is required and must be a valid string timestamp.

2. **Service Items (`/sites/{siteId}/services/{serviceId}`)**:
   - Publicly readable to render the services section.
   - Writable and modifiable only by authenticated administrators.
   - `title` is required, and `order` is a valid number.

3. **Appointments (`/appointments/{appointmentId}`)**:
   - Anyone (including prospective clients/visitors) can create an appointment request with initial status `'pending'`, validating fullName, createdAt, and bounded string sizes.
   - Callers cannot set status to `'confirmed'`, `'completed'`, or `'cancelled'` during initial creation (status must be `'pending'`).
   - Read and update of appointment records is restricted to authenticated administrators, protecting customer PII (phone, email, consultation notes).
   - Once marked completed or cancelled, appointments cannot have their customer fields modified (terminal state locking).

## 2. The "Dirty Dozen" Adversarial Payloads

1. **Payload 1: Unauthenticated Config Defacement**:
   - Anonymous user sends `setDoc` to `/sites/default` replacing `businessName` with malicious text.
   - Expected: `PERMISSION_DENIED`.

2. **Payload 2: Oversized Payload Injection**:
   - Authenticated user injects a 500KB string into `businessDescription`.
   - Expected: `PERMISSION_DENIED` (`size() <= 2000`).

3. **Payload 3: Ghost Field Injection in Site Config**:
   - Authenticated user attempts write with `isRootAdmin: true` or `shadowField: "exploit"`.
   - Expected: `PERMISSION_DENIED` (`keys().hasOnly(...)`).

4. **Payload 4: Invalid Document ID Poisoning**:
   - Write to `/sites/invalid..path$$` or `/appointments/../../root`.
   - Expected: `PERMISSION_DENIED` (`isValidId()`).

5. **Payload 5: PII Harvesting by Public Visitors**:
   - Unauthenticated visitor performs `get` or `list` on `/appointments`.
   - Expected: `PERMISSION_DENIED`.

6. **Payload 6: Unauthorized Status Escalation**:
   - Public visitor creates an appointment with `status: 'confirmed'`.
   - Expected: `PERMISSION_DENIED` (creation requires `status == 'pending'`).

7. **Payload 7: Unauthorized Appointment Deletion**:
   - Unauthenticated visitor attempts `deleteDoc` on `/appointments/{id}`.
   - Expected: `PERMISSION_DENIED`.

8. **Payload 8: Terminal State Modification**:
   - Updating customer data on a completed appointment without admin privileges.
   - Expected: `PERMISSION_DENIED`.

9. **Payload 9: Negative or Malformed Service Order**:
   - Creating a service item with non-numeric `order` or missing `title`.
   - Expected: `PERMISSION_DENIED`.

10. **Payload 10: Service Deletion by Public**:
    - Unauthenticated user attempts `deleteDoc` on `/sites/default/services/srv1`.
    - Expected: `PERMISSION_DENIED`.

11. **Payload 11: Spoofed Admin Token Claims**:
    - Request relies on client-set token claims (`auth.token.role == 'admin'`).
    - Expected: `PERMISSION_DENIED`. Authentication is enforced securely.

12. **Payload 12: Null Byte or Regex ID Bypass**:
    - Document ID containing special characters, whitespace, or path traversal.
    - Expected: `PERMISSION_DENIED` (regex guard `^[a-zA-Z0-9_-]+$`).
