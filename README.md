# Coffee Shop Order Management API

This is a **Serverless REST API** built with **AWS API Gateway**, **AWS Lambda**, and **DynamoDB**. It allows you to manage coffee shop orders with **CRUD functionality** (Create, Read, Update, Delete). The API supports pagination for fetching all orders and is deployed using **GitHub Actions CI/CD**.

---

## Features

- **Create Order**: Add a new order.
- **Get Order**: Retrieve a single order by ID or all orders (paginated).
- **Update Order**: Modify an existing order.
- **Delete Order**: Remove an order.

---

## Technologies Used

- **AWS Lambda**: Serverless compute service.
- **AWS API Gateway**: REST API management.
- **DynamoDB**: NoSQL database for storing orders.
- **Serverless Framework**: Infrastructure as Code (IaC) for deploying AWS resources.
- **GitHub Actions**: CI/CD pipeline for automated deployments.
- **TypeScript**: Programming language for Lambda functions.

---

## Prerequisites

Before you begin, ensure you have the following:

1. **AWS Account**: You need an AWS account to deploy the API.
2. **Node.js**: Install Node.js (v18 or later).
3. **Serverless Framework**: Install the Serverless Framework globally:
   ```bash
   npm install -g serverless
   ```
4. **AWS CLI**: Install and configure the AWS CLI with your credentials:
   ```bash
   aws configure
   ```

---

## Setup

### 1. Clone the Repository

Clone this repository to your local machine:
```bash
git clone https://github.com/didasmbalanya/sls-aws
cd sls-aws
```

### 2. Install Dependencies

Install the required dependencies:
```bash
npm install
```

### 3. Configure AWS Credentials

Add your AWS credentials to GitHub Secrets:
1. Go to your GitHub repository.
2. Navigate to **Settings > Secrets > Actions**.
3. Add the following secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS Access Key ID.
   - `AWS_SECRET_ACCESS_KEY`: Your AWS Secret Access Key.
   - `SERVERLESS_ACCESS_KEY` : Your Serverless Framework secret key for CI/CD.

---

## Deployment

The API is deployed using **GitHub Actions CI/CD**. Push to the `main` branch to trigger a deployment.

### Manual Deployment

To deploy manually, run:
```bash
npx serverless deploy --stage production --region us-east-1
```

---

## API Endpoints

### 1. Create Order
- **Method**: `POST`
- **Path**: `/orders`
- **Request Body**:
  ```json
  {
    "customerName": "John Doe",
    "items": ["Latte", "Croissant"]
  }
  ```
- **Response**:
  ```json
  {
    "orderId": "123",
    "customerName": "John Doe",
    "items": ["Latte", "Croissant"],
    "status": "pending",
    "createdAt": "2023-10-01T00:00:00Z"
  }
  ```

### 2. Get Order by ID
- **Method**: `GET`
- **Path**: `/orders/{orderId}`
- **Response**:
  ```json
  {
    "orderId": "123",
    "customerName": "John Doe",
    "items": ["Latte", "Croissant"],
    "status": "pending",
    "createdAt": "2023-10-01T00:00:00Z"
  }
  ```

### 3. Get All Orders (Paginated)
- **Method**: `GET`
- **Path**: `/orders`
- **Query Parameters**:
  - `limit`: Number of items per page (default: 10).
  - `page`: Page number to fetch (default: 1).
- **Response**:
  ```json
  {
    "items": [
      {
        "orderId": "123",
        "customerName": "John Doe",
        "items": ["Latte", "Croissant"],
        "status": "pending",
        "createdAt": "2023-10-01T00:00:00Z"
      }
    ],
    "page": 1,
    "limit": 10,
    "totalItems": 1,
    "lastEvaluatedKey": null
  }
  ```

### 4. Update Order
- **Method**: `PUT`
- **Path**: `/orders/{orderId}`
- **Request Body**:
  ```json
  {
    "customerName": "Jane Doe",
    "items": ["Espresso"],
    "status": "completed"
  }
  ```
- **Response**:
  ```json
  {
    "orderId": "123",
    "customerName": "Jane Doe",
    "items": ["Espresso"],
    "status": "completed",
    "createdAt": "2023-10-01T00:00:00Z"
  }
  ```

### 5. Delete Order
- **Method**: `DELETE`
- **Path**: `/orders/{orderId}`
- **Response**:
  ```json
  {
    "message": "Order deleted successfully"
  }
  ```

---

## Local Development

1. **Install Serverless Offline**:
   ```bash
   npm install --save-dev serverless-offline
   ```

2. **Run the API Locally**:
   ```bash
   serverless offline
   ```

3. **Test the API**:
   Use tools like **Postman** or **curl** to test the API endpoints locally.

---


## CI/CD Pipeline

The project uses **GitHub Actions** for CI/CD. The pipeline:
1. Installs dependencies.
2. Runs unit tests.
3. Deploys the API to AWS.


## Acknowledgments

- **Serverless Framework**: For simplifying AWS deployments.
- **AWS**: For providing the cloud infrastructure.
- **GitHub Actions**: For enabling seamless CI/CD.

---

Let me know if you need further assistance or additional details! 🚀