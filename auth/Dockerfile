# Use lightweight Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY app/requirements.txt .
RUN pip install -r requirements.txt

# Copy application files
COPY app/ .

# Expose port
EXPOSE 6000

# Health check endpoint
HEALTHCHECK CMD curl --fail http://localhost:6000/health || exit 1

# Run the API
CMD ["python", "auth_api.py"]
