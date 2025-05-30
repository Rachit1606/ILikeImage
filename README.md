# ILikeImage 🎨📷

ILikeImage is a cloud-native image conversion web application designed to make image format transformation seamless and scalable. Users can upload an image, select the desired output format, and receive download links for both the original and converted images.

---

## 📌 Features

- Upload image and convert to another format
- Real-time status tracking
- Download original and converted images
- Serverless backend architecture
- SNS + SQS fanout pattern for async processing
- Monitored using CloudWatch
- Follows AWS Well-Architected Framework

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (HTML, CSS, JS)
- Hosted using **AWS Elastic Beanstalk** with Docker

### Backend
- **Python** (AWS Lambda functions)
- **Amazon API Gateway** for REST API exposure
- **Amazon S3** for object storage (original & converted images)
- **Amazon DynamoDB** for metadata and tracking
- **Amazon SNS + SQS** for fanout message-based image processing
- **AWS CloudWatch** for logs and performance monitoring

---

## 📸 Screenshots

- **Image Upload Page**  
  Users can upload images and choose the target format.

  ![image](https://github.com/user-attachments/assets/a72f62f9-f2e6-46e9-bbd3-f56a8ff6fb2e)

![image](https://github.com/user-attachments/assets/34a4b96a-0484-48fa-95b4-faebd40fd6b2)


- **Download Links**  
  Links to original and converted images are shown after processing.

  ![image](https://github.com/user-attachments/assets/18741821-ad7f-4038-853f-b92e6078ef88)


---

## 🧩 Architecture Overview

![Architecture Diagram](https://github.com/user-attachments/assets/13dbeb3a-5282-41e4-99f9-404556f08f8e)


- **Elastic Beanstalk** serves React frontend
- **API Gateway** routes requests to backend
- **Lambda** handles logic and image conversion
- **SNS** triggers fanout notifications to **SQS**
- **SQS** queues trigger relevant Lambda functions
- **DynamoDB** tracks request metadata
- **S3** stores original and converted images
- **CloudWatch** monitors all services

---

## 🔐 AWS Well-Architected Principles Applied

- **Operational Excellence**: Automated deployment with Beanstalk & Lambda
- **Security**: IAM roles, API Gateway security, SSE-S3, DynamoDB encryption
- **Reliability**: Auto-scaling frontend, resilient queues with retry logic
- **Performance Efficiency**: Event-driven serverless architecture
- **Cost Optimization**: Pay-per-use Lambda/API Gateway, lifecycle policies on S3

## 📦 Folder Structure (Sample)

```text
ilikeimage/
├── client/                
│   ├── public/
│   └── src/
├── backend/                
│   └── image_converter/
├── README.md

```

## 🧪 Future Improvements

- Add user authentication and history
- Support batch image conversion
- Support more file types (e.g., PDF to image)
- Add drag-and-drop support to frontend UI
- Analytics via AWS Pinpoint or CloudWatch dashboards
