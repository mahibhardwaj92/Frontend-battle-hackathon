document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // PERFORMANCE LOADER ORCHESTRATION (<500ms Cap)
    // ==========================================
    const loader = document.getElementById("global-loader");
    setTimeout(() => {
        if(loader) {
            loader.style.opacity = "0";
            setTimeout(() => loader.remove(), 350); // Clean DOM detachment
        }
    }, 120);

    // ==========================================
    // FEATURE 1: MULTI-DIMENSIONAL PRICING MATRIX
    // ==========================================
    const pricingMatrix = {
        USD: { symbol: "$", base: 29, pro: 79, enterprise: 199 },
        INR: { symbol: "₹", base: 2499, pro: 6499, enterprise: 16999 },
        EUR: { symbol: "€", base: 27, pro: 75, enterprise: 185 }
    };

    let currentCurrency = "USD";
    let isAnnual = false;

    // Direct isolated DOM bindings bypassing template engine re-renders
    const priceNodes = {
        base: document.getElementById("price-base"),
        pro: document.getElementById("price-pro"),
        enterprise: document.getElementById("price-enterprise")
    };
    
    const currencySymbols = document.querySelectorAll(".currency-symbol");
    const billingToggle = document.getElementById("billing-toggle");
    const currencySwitcher = document.getElementById("currency-switcher");

    function updateIsolatedPrices() {
        const tariff = pricingMatrix[currentCurrency];
        const discountMultiplier = isAnnual ? 0.80 : 1.0; // Flat 20% Discount

        // Localized Mutation: Targets exact text elements avoiding structural layout thrashing
        currencySymbols.forEach(node => {
            if(node.textContent !== tariff.symbol) node.textContent = tariff.symbol;
        });

        for (const key in priceNodes) {
            if (priceNodes.hasOwnProperty(key)) {
                if (priceNodes[key]) { // Node check to avoid errors
                    const calculatedPrice = Math.round(tariff[key] * discountMultiplier);
                    if (priceNodes[key].textContent !== String(calculatedPrice)) {
                        priceNodes[key].textContent = calculatedPrice;
                    }
                }
            }
        }
    }

    if (billingToggle) {
        billingToggle.addEventListener("click", () => {
            isAnnual = !isAnnual;
            billingToggle.setAttribute("aria-checked", isAnnual);
            updateIsolatedPrices();
        });
    }

    if (currencySwitcher) {
        currencySwitcher.addEventListener("change", (e) => {
            currentCurrency = e.target.value;
            updateIsolatedPrices();
        });
    }


    // ==========================================
    // FEATURE 2: BENTO-TO-ACCORDION CONTEXT LOCK
    // ==========================================
    const featureCards = document.querySelectorAll(".feature-card");
    let activeIndex = 0; // Persistent Source of Truth

    function setActiveContext(index) {
        activeIndex = index;
        featureCards.forEach((card, idx) => {
            if (idx === index) {
                card.classList.add("active");
            } else {
                card.classList.remove("active");
            }
        });
    }

    // Desktop/Mobile Focus Hooks
    featureCards.forEach((card, index) => {
        card.addEventListener("mouseenter", () => {
            if (window.innerWidth > 968) {
                setActiveContext(index);
            }
        });

        card.addEventListener("click", () => {
            if (window.innerWidth <= 968) {
                setActiveContext(index);
            }
        });
    });

    // Context-Lock Constraint: Listen to viewport reflow variations cleanly
    window.addEventListener("resize", () => {
        setActiveContext(activeIndex);
    });

    // Initialize State System on Startup
    updateIsolatedPrices();
    // ... upar ka baaki saara code rehne dein ...

    // Line 112: Initialize State System on Startup
    updateIsolatedPrices();

    // ==========================================
    // ACTION BUTTON INTERACTIONS (Yahan se jodein)
    // ==========================================
    
    // 1. Hero Actions (Try Now & Learn More)
    const tryNowBtn = document.querySelector(".hero-actions .btn-primary");
    const learnMoreBtn = document.querySelector(".hero-actions .btn-secondary");

    if (tryNowBtn) {
        tryNowBtn.addEventListener("click", () => {
            alert("🚀 AetherEngine Sandbox Initializing... Welcome aboard!");
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener("click", () => {
            const featuresSection = document.getElementById("features");
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // 2. Pricing Tier Actions (Get Base, Get Pro, Contact Sales)
    const priceCards = document.querySelectorAll(".price-card");
    
    priceCards.forEach(card => {
        const tierName = card.querySelector("h3").textContent;
        const actionBtn = card.querySelector(".btn");

        if (actionBtn) {
            actionBtn.addEventListener("click", () => {
                alert(`🛒 Checkout initiated for [ ${tierName} Plan ] setup system.`);
            });
        }
    });

    // 3. Header CTA (Get Started)
    const headerCta = document.querySelector(".header-cta");
    if (headerCta) {
        headerCta.addEventListener("click", () => {
            alert("🔑 Opening Registration Portal...");
        });
    }

}); 
