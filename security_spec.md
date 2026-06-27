# Security Specification for BackStage Commercial Lead Management

## 1. Data Invariants
- Leads can be created by unauthenticated public visitors (public submission).
- Only authenticated admins or owners can read, list, update, or delete leads.
- The global config (admin password/PIN) can only be accessed or modified by authenticated administrators.

## 2. The "Dirty Dozen" Payloads (Deny Cases)
1. **Unauthenticated Read on Leads Collection**: A visitor tries to list all leads.
2. **Unauthenticated Read on Single Lead**: A visitor tries to fetch details of a specific lead.
3. **Unauthenticated Update on Lead**: A visitor tries to modify an existing lead's diagnostic or status.
4. **Unauthenticated Delete on Lead**: A visitor tries to delete a lead.
5. **Read on Config by Anonymous User**: A visitor tries to read `/config/admin` to steal the PIN.
6. **Update on Config by Anonymous User**: A visitor tries to change the admin PIN without access.
7. **Lead Creation with Missing Required Fields**: A payload missing `name` or `whatsapp`.
8. **Lead Creation with Spoofed ID format**: ID containing malicious injection.
9. **Lead Creation with Maliciously Long Fields**: Exceeding 10,000 characters for a name.
10. **Lead Creation with Injected Fields**: Adding unknown properties to bypass schemas.
11. **Admin PIN Modification to Empty**: Setting PIN to empty or null.
12. **Admin PIN Modification by Non-Admin**: Updating the config collection without verification.

## 3. Test Cases (Mock Rules Test Runner)
All above cases will return `PERMISSION_DENIED` under the active `firestore.rules` ruleset.
