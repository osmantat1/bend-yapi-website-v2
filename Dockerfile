# Next.js Geliştirme Ortamı
# Bu Dockerfile yalnızca geliştirme (dev) aşaması için tasarlandı.

FROM node:20-alpine

# Çalışma dizini
WORKDIR /app

# Bağımlılık dosyalarını kopyala (önce bunlar — cache optimizasyonu)
COPY package.json package-lock.json* ./

# Bağımlılıkları yükle
RUN npm install

# Kaynak kodu kopyala
COPY . .

# Next.js geliştirme portu
EXPOSE 3000

# Ortam değişkeni
ENV NODE_ENV=development

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
