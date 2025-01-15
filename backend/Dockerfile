FROM php:8.2-apache

# Installez les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Installez Xdebug
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Copiez et configurez Apache
COPY ./apacheConf.txt /etc/apache2/sites-available/000-default.conf

# Activez le module de réécriture d'Apache et configurez le site
RUN a2enmod rewrite && \
    ln -sf /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-enabled/000-default.conf

# Installez Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copiez les fichiers du projet Symfony dans le conteneur
COPY . /var/www/html

# Exécutez composer install pour installer les dépendances Symfony
WORKDIR /var/www/html
RUN composer install --no-interaction --optimize-autoloader

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Commande par défaut
CMD ["apache2-foreground"]
