# Dockerfile

FROM node:20-alpine

WORKDIR /usr/src/app

# Menyalin file package.json dan package-lock.json untuk menginstall dependensi terlebih dahulu
COPY package*.json ./
RUN npm install

# Menyalin semua file proyek ke dalam image
COPY . .

# Generate Prisma Client di dalam proses build
RUN npx prisma generate

EXPOSE 3000

# Menjalankan aplikasi
CMD ["npm", "start"]
