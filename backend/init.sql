CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS products (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), coupang_id VARCHAR(100), title TEXT NOT NULL, price INTEGER, rating FLOAT, review_count INTEGER, image_urls TEXT[], original_url TEXT, cached_at TIMESTAMP DEFAULT NOW(), embedding vector(768));
CREATE TABLE IF NOT EXISTS review_insights (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), product_id UUID REFERENCES products(id), pros JSONB, cons JSONB, verdict TEXT, keywords TEXT[], created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE IF NOT EXISTS affiliate_links (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), product_id UUID REFERENCES products(id), platform VARCHAR(50), affiliate_url TEXT, disclosure TEXT, sub_id VARCHAR(100), created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE IF NOT EXISTS videos (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), product_id UUID REFERENCES products(id), platform VARCHAR(50), template_type VARCHAR(50), script JSONB, s3_url TEXT, status VARCHAR(20) DEFAULT 'queued', cost_usd FLOAT DEFAULT 0, render_time_sec INTEGER, created_at TIMESTAMP DEFAULT NOW());
