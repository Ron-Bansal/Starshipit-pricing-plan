// Format number with commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Helper function for price animations
function animateCounterValue(element, startValue, endValue, duration) {
  let startTime;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentValue = Math.floor(
      startValue + progress * (endValue - startValue)
    );
    element.textContent = currentValue;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = endValue;
    }
  };
  window.requestAnimationFrame(step);
}

// Feature info and plan details are defined here (removed for brevity)

document.addEventListener("DOMContentLoaded", function () {
  // Plan data - simplified version
  const plans = [
    {
      name: "Starter",
      newLabelVolume: 100,
      newMonthlyPrice: 50,
      automationRules: 3,
      courierIntegrations: 2,
      trackingNotifications: "Basic",
      userAccounts: "2-5",
      features: {
        productCatalogue: false,
        packingValidation: false,
        recommendedPackaging: false,
        shippingMargins: false,
        brandedReturns: { included: false, addon: 20 },
        liveRates: { included: false, addon: 30 },
        multiAccounts: { included: false, addon: 25 },
      },
      flexUsage: 0.15,
      badge: "Basic",
    },
    {
      name: "Starter Plus",
      newLabelVolume: 500,
      newMonthlyPrice: 140,
      automationRules: 3,
      courierIntegrations: 2,
      trackingNotifications: "Basic",
      userAccounts: "2-5",
      features: {
        productCatalogue: false,
        packingValidation: false,
        recommendedPackaging: false,
        shippingMargins: false,
        brandedReturns: { included: false, addon: 20 },
        liveRates: { included: false, addon: 30 },
        multiAccounts: { included: false, addon: 25 },
      },
      flexUsage: 0.15,
      badge: "Popular",
    },
    {
      name: "Professional",
      newLabelVolume: 1000,
      newMonthlyPrice: 200,
      automationRules: 5,
      courierIntegrations: 4,
      trackingNotifications: "Advanced",
      userAccounts: "5-10",
      features: {
        productCatalogue: true,
        packingValidation: true,
        recommendedPackaging: true,
        shippingMargins: true,
        brandedReturns: { included: false, addon: 20 },
        liveRates: { included: false, addon: 30 },
        multiAccounts: { included: true, limit: 2 },
      },
      flexUsage: 0.1,
      badge: "Best Value",
    },
    {
      name: "Professional Plus",
      newLabelVolume: 5000,
      newMonthlyPrice: 300,
      automationRules: 5,
      courierIntegrations: 4,
      trackingNotifications: "Advanced",
      userAccounts: "5-10",
      features: {
        productCatalogue: true,
        packingValidation: true,
        recommendedPackaging: true,
        shippingMargins: true,
        brandedReturns: { included: false, addon: 20 },
        liveRates: { included: false, addon: 30 },
        multiAccounts: { included: true, limit: 2 },
      },
      flexUsage: 0.1,
      badge: "High Volume",
    },
    {
      name: "Enterprise",
      newLabelVolume: 10000,
      newMonthlyPrice: 500,
      automationRules: Infinity,
      courierIntegrations: Infinity,
      trackingNotifications: "Advanced",
      userAccounts: "Unlimited",
      features: {
        productCatalogue: true,
        packingValidation: true,
        recommendedPackaging: true,
        shippingMargins: true,
        brandedReturns: { included: true },
        liveRates: { included: true },
        multiAccounts: { included: true, limit: 3, custom: true },
      },
      flexUsage: "Custom",
      badge: "Most Features",
    },
    {
      name: "Enterprise Plus",
      newLabelVolume: 10000,
      newMonthlyPrice: "Custom",
      automationRules: Infinity,
      courierIntegrations: Infinity,
      trackingNotifications: "Advanced",
      userAccounts: "Unlimited",
      features: {
        productCatalogue: true,
        packingValidation: true,
        recommendedPackaging: true,
        shippingMargins: true,
        brandedReturns: { included: true },
        liveRates: { included: true },
        multiAccounts: { included: true, limit: 3, custom: true },
      },
      flexUsage: "Custom",
      badge: "Enterprise",
    },
  ];

  // DOM Elements
  const volumeSlider = document.getElementById("volume-slider");
  const volumeInput = document.getElementById("volume-input");
  const billingToggle = document.getElementById("billing-toggle");
  const monthlyLabel = document.getElementById("monthly-label");
  const annualLabel = document.getElementById("annual-label");

  // Feature inputs
  const automationRules = document.getElementById("automation-rules");
  const courierCount = document.getElementById("courier-count");
  const trackingLevel = document.getElementById("tracking-level");
  const userAccounts = document.getElementById("user-accounts");
  const multiAccounts = document.getElementById("multi-accounts");

  // Checkbox features
  const productCatalogue = document.getElementById("product-catalogue");
  const packingValidation = document.getElementById("packing-validation");
  const recommendedPackaging = document.getElementById("recommended-packaging");
  const shippingMargins = document.getElementById("shipping-margins");
  const brandedReturns = document.getElementById("branded-returns");
  const liveRates = document.getElementById("live-rates");
  const accountManagement = document.getElementById("account-management");
  const inventoryIntegration = document.getElementById("inventory-integration");
  const wmsIntegration = document.getElementById("wms-integration");
  const erpIntegration = document.getElementById("erp-integration");
  const sso = document.getElementById("sso");

  // Result elements
  const planName = document.getElementById("plan-name");
  const planPrice = document.getElementById("plan-price");
  const planVolume = document.getElementById("plan-volume");
  const planAutomation = document.getElementById("plan-automation");
  const planCouriers = document.getElementById("plan-couriers");
  const planTracking = document.getElementById("plan-tracking");
  const planUsers = document.getElementById("plan-users");
  const totalPrice = document.getElementById("total-price");
  const pricePeriod = document.getElementById("price-period");

  // Add-on sections
  const liveRatesAddon = document.getElementById("live-rates-addon");
  const multiAccountAddon = document.getElementById("multi-account-addon");
  const brandedReturnsAddon = document.getElementById("branded-returns-addon");
  const includedAccountsAddon = document.getElementById(
    "included-accounts-addon"
  );
  const flexUsage = document.getElementById("flex-usage");

  // Create Back to Top button
  createBackToTopButton();

  // Setup sticky total cost behavior
  setupStickyCost();

  // Format number with commas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Helper function for price animations
  function animateCounterValue(element, startValue, endValue, duration) {
    if (!element) return;

    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = Math.floor(
        startValue + progress * (endValue - startValue)
      );
      element.textContent = currentValue;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = endValue;
      }
    };
    window.requestAnimationFrame(step);
  }

  // Initialize tooltips
  function initTooltips() {
    const tooltips = document.querySelectorAll(".tooltip");
    tooltips.forEach((tooltip) => {
      tooltip.addEventListener("mouseenter", function () {
        const tooltipText = this.querySelector(".tooltip-text");
        if (tooltipText) {
          tooltipText.style.visibility = "visible";
          tooltipText.style.opacity = "1";
        }
      });
      tooltip.addEventListener("mouseleave", function () {
        const tooltipText = this.querySelector(".tooltip-text");
        if (tooltipText) {
          tooltipText.style.visibility = "hidden";
          tooltipText.style.opacity = "0";
        }
      });
    });
  }

  // Initialize card animations
  function initCardAnimations() {
    const cards = document.querySelectorAll(".result-card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
        this.style.boxShadow = "var(--shadow-lg)";
      });
      card.addEventListener("mouseleave", function () {
        this.style.transform = "";
        this.style.boxShadow = "";
      });
    });
  }

  // Enhanced Volume Slider
  function updateSliderFill() {
    if (!volumeSlider) return;
    const value =
      (volumeSlider.value - volumeSlider.min) /
      (volumeSlider.max - volumeSlider.min);
    volumeSlider.style.setProperty("--value", value);
  }

  function updateVolumeMarkers() {
    if (!volumeSlider) return;

    const value = parseInt(volumeSlider.value);
    const marks = document.querySelectorAll(".slider-mark");

    marks.forEach((mark) => {
      mark.classList.remove("plan-changed");
      const markText = mark.textContent.replace(/,/g, "").replace(/\+/g, "");
      const markValue = parseInt(markText);

      // Find next mark value
      let nextMarkValue = null;
      const allValues = Array.from(marks).map((m) => {
        const text = m.textContent.replace(/,/g, "").replace(/\+/g, "");
        return parseInt(text);
      });
      for (let i = 0; i < allValues.length; i++) {
        if (allValues[i] > markValue) {
          nextMarkValue = allValues[i];
          break;
        }
      }

      // Highlight the current active mark
      if (value >= markValue && (!nextMarkValue || value < nextMarkValue)) {
        mark.classList.add("plan-changed");
      }
    });
  }

  // Create and append back to top button
  function createBackToTopButton() {
    // Check if it already exists
    if (document.getElementById("back-to-top")) return;

    const backToTopButton = document.createElement("button");
    backToTopButton.id = "back-to-top";
    backToTopButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      `;
    document.body.appendChild(backToTopButton);

    // Show/hide based on scroll position
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Setup sticky behavior for total cost on medium screens
  function setupStickyCost() {
    const resultSection = document.querySelector(".results-section");
    const totalCostCard = document.querySelector(".total-cost");

    if (!resultSection || !totalCostCard) return;

    function updateStickyBehavior() {
      const windowWidth = window.innerWidth;

      if (windowWidth > 768 && windowWidth < 992) {
        const scrollY = window.scrollY;
        const sectionTop =
          resultSection.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = resultSection.offsetHeight;
        const cardHeight = totalCostCard.offsetHeight;

        if (
          scrollY > sectionTop &&
          scrollY < sectionTop + sectionHeight - cardHeight - 40
        ) {
          totalCostCard.classList.add("sticky");
          totalCostCard.style.top = "20px";
          totalCostCard.style.width = resultSection.offsetWidth - 40 + "px"; // 40px for padding
        } else {
          totalCostCard.classList.remove("sticky");
          totalCostCard.style.top = "";
          totalCostCard.style.width = "";
        }
      } else {
        // Remove sticky on other screen sizes
        totalCostCard.classList.remove("sticky");
        totalCostCard.style.top = "";
        totalCostCard.style.width = "";
      }
    }

    window.addEventListener("scroll", updateStickyBehavior);
    window.addEventListener("resize", updateStickyBehavior);

    // Initial check
    updateStickyBehavior();
  }

  // Main calculation function
  function updateCalculator() {
    if (!volumeInput) return;

    const labelVolume = Number(volumeInput.value);
    const isAnnual = billingToggle ? billingToggle.checked : false;
    let previousPlan = null;

    // Store the previous plan name before recalculating
    if (planName && planName.textContent) {
      previousPlan = planName.textContent.trim().split("\n")[0];
    }

    // Determine required plan based on volume
    let recommendedPlan = findPlanByVolume(labelVolume);

    // Gather feature requirements
    const requiredFeatures = {
      automationRules: automationRules
        ? parseInt(automationRules.value, 10)
        : 0,
      courierCount: courierCount ? parseInt(courierCount.value, 10) : 0,
      trackingLevel: trackingLevel ? trackingLevel.value : "basic",
      userAccounts: userAccounts ? parseInt(userAccounts.value, 10) : 1,
      multiAccounts: multiAccounts ? parseInt(multiAccounts.value, 10) : 0,
      productCatalogue: productCatalogue ? productCatalogue.checked : false,
      packingValidation: packingValidation ? packingValidation.checked : false,
      recommendedPackaging: recommendedPackaging
        ? recommendedPackaging.checked
        : false,
      shippingMargins: shippingMargins ? shippingMargins.checked : false,
      brandedReturns: brandedReturns ? brandedReturns.checked : false,
      liveRates: liveRates ? liveRates.checked : false,
      accountManagement: accountManagement ? accountManagement.checked : false,
      inventoryIntegration: inventoryIntegration
        ? inventoryIntegration.checked
        : false,
      wmsIntegration: wmsIntegration ? wmsIntegration.checked : false,
      erpIntegration: erpIntegration ? erpIntegration.checked : false,
      sso: sso ? sso.checked : false,
    };

    // Check if features require a plan upgrade
    let featurePlan = findPlanByFeatures(requiredFeatures);

    // Choose the higher tier plan between volume-based and feature-based recommendations
    const planIndex = Math.max(
      plans.findIndex((p) => p.name === recommendedPlan.name),
      plans.findIndex((p) => p.name === featurePlan.name)
    );

    recommendedPlan = plans[planIndex];

    // Check if plan changed
    const planChanged = previousPlan !== recommendedPlan.name;

    // Update the display with animation if plan changed
    updatePlanDisplay(recommendedPlan, requiredFeatures, isAnnual, planChanged);
  }

  // Find plan by volume
  function findPlanByVolume(volume) {
    // Use the new label volume limits
    for (let i = 0; i < plans.length; i++) {
      if (volume <= plans[i].newLabelVolume) {
        return plans[i];
      }
    }
    // If volume exceeds all plans, return Enterprise Plus
    return plans[plans.length - 1];
  }

  // Find plan by features
  function findPlanByFeatures(features) {
    // Check each feature to determine the minimum required plan
    let requiredPlanIndex = 0;

    // Automation rules
    if (features.automationRules > 3 && features.automationRules <= 5) {
      requiredPlanIndex = Math.max(requiredPlanIndex, 2); // Professional
    } else if (features.automationRules > 5) {
      requiredPlanIndex = Math.max(requiredPlanIndex, 4); // Enterprise
    }

    // Courier integrations
    if (features.courierCount > 2 && features.courierCount <= 4) {
      requiredPlanIndex = Math.max(requiredPlanIndex, 2); // Professional
    } else if (features.courierCount > 4) {
      requiredPlanIndex = Math.max(requiredPlanIndex, 4); // Enterprise
    }

    // Advanced tracking
    if (features.trackingLevel === "advanced") {
      requiredPlanIndex = Math.max(requiredPlanIndex, 2); // Professional
    }

    // User accounts
    if (features.userAccounts > 5 && features.userAccounts <= 10) {
      requiredPlanIndex = Math.max(requiredPlanIndex, 2); // Professional
    } else if (features.userAccounts > 10) {
      requiredPlanIndex = Math.max(requiredPlanIndex, 4); // Enterprise
    }

    // Professional features
    if (
      features.productCatalogue ||
      features.packingValidation ||
      features.recommendedPackaging ||
      features.shippingMargins ||
      features.inventoryIntegration
    ) {
      requiredPlanIndex = Math.max(requiredPlanIndex, 2); // Professional
    }

    // Enterprise features
    if (
      features.accountManagement ||
      features.wmsIntegration ||
      features.erpIntegration ||
      features.sso
    ) {
      requiredPlanIndex = Math.max(requiredPlanIndex, 4); // Enterprise
    }

    return plans[requiredPlanIndex];
  }

  // Update plan display with animation
  function updatePlanDisplay(plan, features, isAnnual, planChanged = false) {
    if (!planName || !planPrice) return;

    // Previous values for animation
    const prevPrice = planPrice.textContent
      ? parseFloat(planPrice.textContent)
      : null;
    const prevTotal = totalPrice
      ? totalPrice.textContent
        ? parseFloat(totalPrice.textContent)
        : null
      : null;

    // Update plan name and badge
    planName.innerHTML = plan.name;

    // Update or create the plan badge
    // let planBadge = planName.querySelector(".plan-badge");
    // if (!planBadge) {
    //   planBadge = document.createElement("span");
    //   planBadge.className = "plan-badge";
    //   planName.appendChild(planBadge);
    // }

    // planBadge.textContent = plan.badge || "Recommended";

    // Apply change animation if plan changed
    if (planChanged) {
      const resultCards = document.querySelectorAll(".result-card");
      resultCards.forEach((card) => {
        card.classList.add("highlight-change");
        setTimeout(() => {
          card.classList.remove("highlight-change");
        }, 1000);
      });
    }

    // Set price with annual discount if applicable
    let basePrice = plan.newMonthlyPrice;
    if (typeof basePrice === "number") {
      if (isAnnual) {
        basePrice = Math.round(basePrice * 0.9); // 10% discount
      }

      // Animate price change
      if (prevPrice !== null && prevPrice !== basePrice) {
        animateCounterValue(planPrice, prevPrice, basePrice, 800);
      } else {
        planPrice.textContent = basePrice;
      }
    } else {
      planPrice.textContent = basePrice;
    }

    // Update plan details
    if (planVolume)
      planVolume.textContent = `Up to ${numberWithCommas(
        plan.newLabelVolume
      )} labels`;

    if (planAutomation) {
      if (plan.automationRules === Infinity) {
        planAutomation.textContent = "Unlimited rules";
      } else {
        planAutomation.textContent = `Up to ${plan.automationRules} rules`;
      }
    }

    if (planCouriers) {
      if (plan.courierIntegrations === Infinity) {
        planCouriers.textContent = "Unlimited couriers";
      } else {
        planCouriers.textContent = `Up to ${plan.courierIntegrations} couriers`;
      }
    }

    if (planTracking) planTracking.textContent = plan.trackingNotifications;
    if (planUsers) planUsers.textContent = plan.userAccounts;

    // Calculate add-ons and additional costs
    let addOnTotal = 0;

    // Live shipping rates
    if (features.liveRates && liveRatesAddon) {
      liveRatesAddon.style.display = "flex";
      if (plan.features.liveRates && plan.features.liveRates.included) {
        liveRatesAddon.querySelector("div:last-child").textContent =
          "Included in plan";
        liveRatesAddon
          .querySelector("div:last-child")
          .classList.add("included-badge");
      } else {
        liveRatesAddon.querySelector("div:last-child").textContent =
          "$30/month";
        liveRatesAddon
          .querySelector("div:last-child")
          .classList.remove("included-badge");
        addOnTotal += 30;
      }
    } else if (liveRatesAddon) {
      liveRatesAddon.style.display = "none";
    }

    // Multi-brand accounts
    if (features.multiAccounts > 0) {
      // Determine how many accounts are included in the current plan
      let includedAccountsCount = 0;
      if (plan.features.multiAccounts && plan.features.multiAccounts.included) {
        includedAccountsCount = plan.features.multiAccounts.limit;
      }

      // Display included accounts info if applicable
      if (includedAccountsCount > 0 && includedAccountsAddon) {
        includedAccountsAddon.style.display = "flex";
        includedAccountsAddon.querySelector(
          "div:first-child"
        ).textContent = `${includedAccountsCount} Child Account${
          includedAccountsCount !== 1 ? "s" : ""
        }`;
        includedAccountsAddon.querySelector("div:last-child").textContent =
          "Included in plan";
      } else if (includedAccountsAddon) {
        includedAccountsAddon.style.display = "none";
      }

      // Calculate additional accounts beyond what's included
      const additionalAccounts = Math.max(
        0,
        features.multiAccounts - includedAccountsCount
      );

      if (additionalAccounts > 0 && multiAccountAddon) {
        multiAccountAddon.style.display = "flex";

        if (
          plan.name.includes("Enterprise") &&
          plan.features.multiAccounts &&
          plan.features.multiAccounts.custom
        ) {
          // Enterprise plans with custom pricing for additional accounts
          multiAccountAddon.querySelector(
            "div:first-child"
          ).textContent = `${additionalAccounts} Additional Child Account${
            additionalAccounts !== 1 ? "s" : ""
          }`;
          multiAccountAddon.querySelector("div:last-child").textContent =
            "Custom pricing";
        } else {
          // Standard pricing for additional accounts
          multiAccountAddon.querySelector(
            "div:first-child"
          ).textContent = `${additionalAccounts} Additional Child Account${
            additionalAccounts !== 1 ? "s" : ""
          }`;
          multiAccountAddon.querySelector("div:last-child").textContent = `$${
            25 * additionalAccounts
          }/month`;
          addOnTotal += 25 * additionalAccounts;
        }
      } else if (multiAccountAddon) {
        multiAccountAddon.style.display = "none";
      }
    } else {
      // No child accounts needed
      if (includedAccountsAddon) includedAccountsAddon.style.display = "none";
      if (multiAccountAddon) multiAccountAddon.style.display = "none";
    }

    // Branded returns portal
    if (features.brandedReturns && brandedReturnsAddon) {
      brandedReturnsAddon.style.display = "flex";
      if (
        plan.features.brandedReturns &&
        plan.features.brandedReturns.included
      ) {
        brandedReturnsAddon.querySelector("div:last-child").textContent =
          "Included in plan";
        brandedReturnsAddon
          .querySelector("div:last-child")
          .classList.add("included-badge");
      } else {
        brandedReturnsAddon.querySelector("div:last-child").textContent =
          "$20/month";
        brandedReturnsAddon
          .querySelector("div:last-child")
          .classList.remove("included-badge");
        addOnTotal += 20;
      }
    } else if (brandedReturnsAddon) {
      brandedReturnsAddon.style.display = "none";
    }

    // Flex usage information
    if (flexUsage) {
      if (typeof plan.flexUsage === "number") {
        flexUsage.style.display = "flex";
        flexUsage.querySelector(
          "div:last-child"
        ).textContent = `+$${plan.flexUsage.toFixed(2)} per additional label`;
      } else {
        flexUsage.style.display = "flex";
        flexUsage.querySelector("div:last-child").textContent = "Talk to Sales";
      }
    }

    // Calculate and update total price
    let totalCost;
    if (typeof basePrice === "number" && totalPrice) {
      totalCost = basePrice + addOnTotal;

      // Animate total price change
      if (prevTotal !== null && prevTotal !== totalCost) {
        animateCounterValue(totalPrice, prevTotal, totalCost, 800);
      } else {
        totalPrice.textContent = totalCost;
      }

      // If annual, adjust the display to show monthly equivalent
      if (pricePeriod) {
        if (isAnnual) {
          pricePeriod.textContent = "/month (paid annually)";
        } else {
          pricePeriod.textContent = "/month";
        }
      }
    } else if (totalPrice) {
      totalPrice.textContent = "Custom";
      if (pricePeriod) pricePeriod.textContent = "/month";
    }

    // Check if any add-ons are displayed
    const addOnsCard = document.getElementById("add-ons");
    if (addOnsCard) {
      const hasAddOns =
        (liveRatesAddon && liveRatesAddon.style.display === "flex") ||
        (multiAccountAddon && multiAccountAddon.style.display === "flex") ||
        (brandedReturnsAddon && brandedReturnsAddon.style.display === "flex");

      // Show the add-ons card only if there are add-ons to display
      if (hasAddOns || (flexUsage && flexUsage.style.display === "flex")) {
        addOnsCard.style.display = "block";
      } else {
        addOnsCard.style.display = "none";
      }
    }
  }

  // Initialize everything
  initTooltips();
  initCardAnimations();
  updateSliderFill();
  updateVolumeMarkers();

  // Set up event listeners for volume slider and input
  if (volumeSlider) {
    volumeSlider.addEventListener("input", function () {
      if (volumeInput) volumeInput.value = this.value;
      updateSliderFill();
      updateVolumeMarkers();
      updateCalculator();
    });
  }

  if (volumeInput) {
    volumeInput.addEventListener("input", function () {
      if (Number(this.value) > 15000) {
        this.value = 15000;
      }
      if (volumeSlider) {
        volumeSlider.value = this.value;
        updateSliderFill();
        updateVolumeMarkers();
      }
      updateCalculator();
    });
  }

  // Billing toggle event listener
  if (billingToggle) {
    billingToggle.addEventListener("change", function () {
      if (this.checked) {
        if (monthlyLabel) monthlyLabel.classList.remove("active");
        if (annualLabel) annualLabel.classList.add("active");
      } else {
        if (monthlyLabel) monthlyLabel.classList.add("active");
        if (annualLabel) annualLabel.classList.remove("active");
      }
      updateCalculator();
    });
  }

  // Add event listeners to all feature inputs
  const allFeatureInputs = [
    automationRules,
    courierCount,
    trackingLevel,
    userAccounts,
    multiAccounts,
    productCatalogue,
    packingValidation,
    recommendedPackaging,
    shippingMargins,
    brandedReturns,
    liveRates,
    accountManagement,
    inventoryIntegration,
    wmsIntegration,
    erpIntegration,
    sso,
  ];

  allFeatureInputs.forEach((input) => {
    if (input) {
      input.addEventListener("change", updateCalculator);
    }
  });

  // Run the calculator initially
  updateCalculator();
});

document.addEventListener("DOMContentLoaded", function () {
  // Create and append the back to top button if it doesn't exist
  if (!document.getElementById("back-to-top")) {
    const backToTopButton = document.createElement("button");
    backToTopButton.id = "back-to-top";
    backToTopButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      `;
    document.body.appendChild(backToTopButton);

    // Show/hide based on scroll position
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Force a check initially
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible");
    }
  }
});
