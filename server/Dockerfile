FROM node:12

# SET TIME ZONE AND LOCAL TIME
RUN echo "Asia/Makassar" > /etc/timezone
RUN ln -fs /usr/share/zoneinfo/Asia/Makassar /etc/localtime
RUN dpkg-reconfigure -f noninteractive tzdata
# END SET TIME ZONE AND LOCAL TIME

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000
CMD ["npm", "start"]