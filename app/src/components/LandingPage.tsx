import React, { useEffect, useState } from 'react';
import './LandingPage.css';

interface NewsArticle {
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    source: { name: string };
}

export default function LandingPage() {
    const [cryptoData, setCryptoData] = useState<any[]>([]);
    const [worldNews, setWorldNews] = useState<NewsArticle[]>([]);

    // Fetch cryptocurrency data
    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const pages = [1, 2, 3];
                const promises = pages.map((page) =>
                    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=${page}`).then((res) =>
                        res.json()
                    )
                );
                const results = await Promise.all(promises);
                const combinedData = results.flat();
                setCryptoData(combinedData);
            } catch (error) {
                console.error('Error fetching cryptocurrency data:', error);
            }
        };
        fetchCryptoData();
    }, []);

    // Fetch latest news
    useEffect(() => {
        const fetchWorldNews = async () => {
            try {
                const pages = [1, 2, 3]; // Fetch 3 pages for more articles
                const promises = pages.map((page) =>
                    fetch(
                        `https://newsapi.org/v2/top-headlines?category=general&language=en&page=${page}&apiKey=ab83a329293e4bbb95f0e72c7362c0f8`
                    ).then((res) => res.json())
                );
                const results = await Promise.all(promises);
                const combinedNews = results.flatMap((result) => result.articles);
                setWorldNews(combinedNews); // Store all fetched articles
            } catch (error) {
                console.error('Error fetching world news:', error);
            }
        };
        fetchWorldNews();
    }, []);
    

    return (
        <div className="landing-container">
            {/* Marquee Section */}
            <div className="crypto-marquee">
                <div className="marquee-content">
                    {cryptoData.map((crypto) => (
                        <span className="marquee-item" key={crypto.id}>
                            <strong>{crypto.name}:</strong> ${crypto.current_price} ({crypto.price_change_percentage_24h?.toFixed(2)}%)
                        </span>
                    ))}
                </div>
            </div>

            {/* Introduction Section */}
            <header className="landing-header">
                <h1>Welcome to CryptoVault - Crypto Tracker</h1>
                <p>Your ultimate platform for tracking cryptocurrency trends and setting custom price alerts.</p>
                <button className="explore-button" onClick={() => window.location.href = '/tracker'}>
                    Explore Now
                </button>
            </header>

            {/* Features Section */}
            <main className="landing-main">
                <section className="features-section">
                    <h2>Why Choose Us?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Live Updates</h3>
                            <p>Get real-time cryptocurrency price updates at your fingertips.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Custom Alerts</h3>
                            <p>Set personalized price alerts and never miss an opportunity.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Detailed Analytics</h3>
                            <p>Access in-depth analytics to make informed decisions.</p>
                        </div>
                    </div>
                </section>

                {/* Market Trends Section */}
                <section className="market-trends-section">
                    <h2>Market Trends</h2>
                    <div className="market-trends">
                        {cryptoData.slice(0, 8).map((crypto) => (
                            <div className="trend" key={crypto.id}>
                                <h3>{crypto.name}</h3>
                                <p>Current Price: ${crypto.current_price}</p>
                                <p>Change: {crypto.price_change_percentage_24h?.toFixed(2)}%</p>
                            </div>
                        ))}
                    </div>

                    {/* Latest News Subsection */}
                    <div className="crypto-news">
                        <h3>Latest News</h3>
                        <div className="news-marquee">
                            <div className="news-content">
                                {worldNews.map((article, index) => (
                                    <span className="news-item" key={index}>
                                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                                            {article.title}
                                        </a>
                                        <small>
                                            &nbsp;- {article.source.name} | {new Date(article.publishedAt).toLocaleDateString()}
                                        </small>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call-to-Action Section */}
                <section className="cta-section">
                    <h2>Ready to get started?</h2>
                    <button className="signup-button" onClick={() => window.location.href = '/signup'}>
                        Sign Up Now
                    </button>
                </section>
            </main>

            {/* Footer */}
            <footer className="landing-footer">
                <p>&copy; 2024 Crypto Tracker. All rights reserved.</p>
            </footer>
        </div>
    );
}
