module.exports = {
        "locales": "en-US",
        "formats": {
                "date": {
                        "short": {
                                "day": "numeric",
                                "month": "long",
                                "year": "numeric"
                        },
                        "long": {
                                "day": "numeric",
                                "month": "short",
                                "year": "numeric",
                                "hour": "numeric",
                                "minute": "numeric",
                                "second": "numeric"
                        }
                },
                "number": {
                        "USD": {
                                "style": "currency",
                                "currency": "USD",
                                "minimumFractionDigits": 2
                        },
                        "btc": {
                                "maximumFractionDigits": 8
                        },
                        "ether": {
                                "maximumFractionDigits": 18
                        }
                }
        },
        "messages": {
                "nav": {
			"oracles": "Oracles"
		}
        }
};
