# Email OTP Verification API Documentation

The Email OTP Verification API allows you to integrate email-based One-Time Password (OTP) verification into your applications. This documentation provides details on how to use the API to send OTPs and verify them.

Base URL: `https://emailotpverification-hczr.onrender.com`

## Sending OTP via Email

Send an OTP to a specified email address for verification.

- Endpoint: `/send-otp`
- Method: POST
- Request Body:
  - `email` (string, required): The email address to which the OTP will be sent.

**Example Request:**

```json
POST https://emailotpverification-hczr.onrender.com/send-otp
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Example Response:**

```json
Status: 200 OK
Content-Type: application/json

{
  "message": "OTP sent successfully."
}
```

## Verifying OTP

Verify the provided OTP for a given email address.

- Endpoint: `/verify-otp`
- Method: POST
- Request Body:
  - `email` (string, required): The email address for which the OTP needs to be verified.
  - `otp` (string, required): The OTP sent to the email address.

**Example Request:**

```json
POST https://emailotpverification-hczr.onrender.com/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Example Response:**

```json
Status: 200 OK
Content-Type: application/json

{
  "message": "OTP verified successfully."
}
```

## Error Responses

In case of an error, the API will respond with an appropriate error message along with the status code.

- Status: 400 Bad Request

  ```json
  {
    "error": "Email address is required."
  }
  ```

- Status: 400 Bad Request

  ```json
  {
    "error": "Email and OTP are required."
  }
  ```

- Status: 400 Bad Request

  ```json
  {
    "error": "Invalid OTP."
  }
  ```

- Status: 500 Internal Server Error
  ```json
  {
    "error": "Failed to send OTP."
  }
  ```

## Notes

- The OTP is a 6-digit numeric code generated randomly.
- The OTP is valid for 5 minutes.
- The email content includes a link to the HTML page where users can enter the OTP and verify it.

## Usage

1. Make a POST request to `/send-otp` with the email address to which you want to send the OTP.
2. The API will send an email with the OTP to the provided email address.
3. The user receives the OTP and can enter it in the OTP verification form.
4. Make a POST request to `/verify-otp` with the email address and the entered OTP to verify it.
5. The API will respond with a success message if the OTP is correct, or an error message if it's incorrect or expired.

## Security Considerations

- Ensure that you handle sensitive data, such as email addresses and OTPs, securely on your application's backend.
- Implement rate-limiting and security measures to prevent abuse of the API, such as blocking repeated failed OTP verification attempts from the same IP address.
- Use HTTPS to ensure secure communication between your application and the API server.

## Best Practices

- Implement frontend and backend validations to ensure that the email addresses provided by users are valid and the OTPs entered for verification are in the correct format.
- Provide clear instructions and user-friendly messages to guide users through the OTP verification process.
- Consider implementing multi-factor authentication (MFA) in addition to OTP verification for enhanced security.
