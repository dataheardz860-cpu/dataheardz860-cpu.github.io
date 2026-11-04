FROM python:3.12-slim

# LibreOffice Writer + common fonts (Liberation = metric-compatible with Arial/Times/Courier,
# Noto = Hindi and other Indian scripts).
RUN apt-get update \
 && apt-get install -y --no-install-recommends libreoffice-writer-nogui fonts-liberation fonts-dejavu-core fonts-noto-core fonts-crosextra-carlito fonts-crosextra-caladea \
 && rm -rf /var/lib/apt/lists/*

RUN useradd --create-home app
USER app
WORKDIR /home/app
COPY app.py .

ENV PORT=8080
EXPOSE 8080
CMD ["python", "app.py"]
