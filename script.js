const plans = [
  {
    name: "Starter",
    externalGroup: "Starter",
    internalName: "Starter",
    labelVolume: 250,
    newLabelVolume: 100,
    monthlyPrice: 50,
    newMonthlyPrice: 50,
    automationRules: 3,
    courierIntegrations: 2,
    trackingNotifications: "Basic",
    trackingPages: "Basic",
    userAccounts: "2-5",
    features: {
      productCatalogue: false,
      packingValidation: false,
      recommendedPackaging: false,
      shippingMargins: false,
      brandedReturns: { included: false, addon: 20 },
      liveRates: { included: false, addon: 30 },
      multiAccounts: { included: false, addon: 25 },
      accountManagement: false,
      inventoryIntegration: false,
      wmsIntegration: false,
      erpIntegration: false,
      sso: false,
    },
    flexUsage: 0.15,
  },
  {
    name: "Starter Plus",
    externalGroup: "Starter",
    internalName: "Starter Plus",
    labelVolume: 1000,
    newLabelVolume: 500,
    monthlyPrice: 140,
    newMonthlyPrice: 140,
    automationRules: 3,
    courierIntegrations: 2,
    trackingNotifications: "Basic",
    trackingPages: "Basic",
    userAccounts: "2-5",
    features: {
      productCatalogue: false,
      packingValidation: false,
      recommendedPackaging: false,
      shippingMargins: false,
      brandedReturns: { included: false, addon: 20 },
      liveRates: { included: false, addon: 30 },
      multiAccounts: { included: false, addon: 25 },
      accountManagement: false,
      inventoryIntegration: false,
      wmsIntegration: false,
      erpIntegration: false,
      sso: false,
    },
    flexUsage: 0.15,
  },
  {
    name: "Professional",
    externalGroup: "Professional",
    internalName: "Professional",
    labelVolume: 2000,
    newLabelVolume: 1000,
    monthlyPrice: 160,
    newMonthlyPrice: 200,
    automationRules: 5,
    courierIntegrations: 4,
    trackingNotifications: "Advanced",
    trackingPages: "Advanced",
    userAccounts: "5-10",
    features: {
      productCatalogue: true,
      packingValidation: true,
      recommendedPackaging: true,
      shippingMargins: true,
      brandedReturns: { included: false, addon: 20 },
      liveRates: { included: false, addon: 30 },
      multiAccounts: { included: true, limit: 2 },
      accountManagement: false,
      inventoryIntegration: true,
      wmsIntegration: false,
      erpIntegration: false,
      sso: false,
    },
    flexUsage: 0.1,
  },
  {
    name: "Professional Plus",
    externalGroup: "Professional",
    internalName: "Professional Plus",
    labelVolume: 4000,
    newLabelVolume: 5000,
    monthlyPrice: 240,
    newMonthlyPrice: 300,
    automationRules: 5,
    courierIntegrations: 4,
    trackingNotifications: "Advanced",
    trackingPages: "Advanced",
    userAccounts: "5-10",
    features: {
      productCatalogue: true,
      packingValidation: true,
      recommendedPackaging: true,
      shippingMargins: true,
      brandedReturns: { included: false, addon: 20 },
      liveRates: { included: false, addon: 30 },
      multiAccounts: { included: true, limit: 2 },
      accountManagement: false,
      inventoryIntegration: true,
      wmsIntegration: false,
      erpIntegration: false,
      sso: false,
    },
    flexUsage: 0.1,
  },
  {
    name: "Enterprise",
    externalGroup: "Enterprise",
    internalName: "Enterprise",
    labelVolume: 10000,
    newLabelVolume: 10000,
    monthlyPrice: 500,
    newMonthlyPrice: 500,
    automationRules: Infinity,
    courierIntegrations: Infinity,
    trackingNotifications: "Advanced",
    trackingPages: "Advanced",
    userAccounts: "Unlimited",
    features: {
      productCatalogue: true,
      packingValidation: true,
      recommendedPackaging: true,
      shippingMargins: true,
      brandedReturns: { included: true },
      liveRates: { included: true },
      multiAccounts: { included: true, limit: 3, custom: true },
      accountManagement: true,
      inventoryIntegration: true,
      wmsIntegration: true,
      erpIntegration: true,
      sso: true,
    },
    flexUsage: "Custom",
  },
  {
    name: "Enterprise Plus",
    externalGroup: "Enterprise",
    internalName: "Enterprise Plus",
    labelVolume: 10000,
    newLabelVolume: 10000,
    monthlyPrice: "Custom",
    newMonthlyPrice: "Custom",
    automationRules: Infinity,
    courierIntegrations: Infinity,
    trackingNotifications: "Advanced",
    trackingPages: "Advanced",
    userAccounts: "Unlimited",
    features: {
      productCatalogue: true,
      packingValidation: true,
      recommendedPackaging: true,
      shippingMargins: true,
      brandedReturns: { included: true },
      liveRates: { included: true },
      multiAccounts: { included: true, limit: 3, custom: true },
      accountManagement: true,
      inventoryIntegration: true,
      wmsIntegration: true,
      erpIntegration: true,
      sso: true,
    },
    flexUsage: "Custom",
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
const featureRecommendations = document.getElementById(
  "feature-recommendations"
);
const totalPrice = document.getElementById("total-price");

// Add-on sections
const liveRatesAddon = document.getElementById("live-rates-addon");
const multiAccountAddon = document.getElementById("multi-account-addon");
const brandedReturnsAddon = document.getElementById("branded-returns-addon");
const flexUsage = document.getElementById("flex-usage");

// Sync volume slider and input
volumeSlider.addEventListener("input", () => {
  volumeInput.value = volumeSlider.value;
  updateCalculator();
});

volumeInput.addEventListener("input", () => {
  // Limit to max value
  if (Number(volumeInput.value) > 15000) {
    volumeInput.value = 15000;
  }
  volumeSlider.value = volumeInput.value;
  updateCalculator();
});

// Billing toggle
billingToggle.addEventListener("change", () => {
  if (billingToggle.checked) {
    monthlyLabel.classList.remove("active");
    annualLabel.classList.add("active");
  } else {
    monthlyLabel.classList.add("active");
    annualLabel.classList.remove("active");
  }
  updateCalculator();
});

// Update on any feature change
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
  input.addEventListener("change", updateCalculator);
});

// Main calculation function
function updateCalculator() {
  const labelVolume = Number(volumeInput.value);
  const isAnnual = billingToggle.checked;

  // Determine required plan based on volume
  let recommendedPlan = findPlanByVolume(labelVolume);

  // Check for feature requirements that might upgrade the plan
  const requiredFeatures = {
    automationRules: parseInt(automationRules.value, 10),
    courierCount: parseInt(courierCount.value, 10),
    trackingLevel: trackingLevel.value,
    userAccounts: parseInt(userAccounts.value, 10),
    multiAccounts: parseInt(multiAccounts.value, 10),
    productCatalogue: productCatalogue.checked,
    packingValidation: packingValidation.checked,
    recommendedPackaging: recommendedPackaging.checked,
    shippingMargins: shippingMargins.checked,
    brandedReturns: brandedReturns.checked,
    liveRates: liveRates.checked,
    accountManagement: accountManagement.checked,
    inventoryIntegration: inventoryIntegration.checked,
    wmsIntegration: wmsIntegration.checked,
    erpIntegration: erpIntegration.checked,
    sso: sso.checked,
  };

  // Check if features require a plan upgrade
  let featurePlan = findPlanByFeatures(requiredFeatures);

  // Choose the higher tier plan between volume-based and feature-based recommendations
  const planIndex = Math.max(
    plans.findIndex((p) => p.name === recommendedPlan.name),
    plans.findIndex((p) => p.name === featurePlan.name)
  );

  recommendedPlan = plans[planIndex];

  // Update the display
  updatePlanDisplay(recommendedPlan, requiredFeatures, isAnnual);
}

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

//   // Multi-location accounts
//   if (features.multiAccounts >= 3) {
//     requiredPlanIndex = Math.max(requiredPlanIndex, 4); // Enterprise
//   } else if (features.multiAccounts > 0) {
//     requiredPlanIndex = Math.max(requiredPlanIndex, 2); // Professional
//   }

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

function updatePlanDisplay(plan, features, isAnnual) {
  // Update plan name and details
  planName.textContent = plan.name;

  // Set price with annual discount if applicable
  let basePrice = plan.newMonthlyPrice;
  if (typeof basePrice === "number") {
    if (isAnnual) {
      basePrice = Math.round(basePrice * 0.9); // 10% discount
    }
    planPrice.textContent = basePrice;
  } else {
    planPrice.textContent = basePrice;
  }

  // Update plan details
  planVolume.textContent = `Up to ${plan.newLabelVolume} labels`;

  if (plan.automationRules === Infinity) {
    planAutomation.textContent = "Unlimited rules";
  } else {
    planAutomation.textContent = `Up to ${plan.automationRules} rules`;
  }

  if (plan.courierIntegrations === Infinity) {
    planCouriers.textContent = "Unlimited couriers";
  } else {
    planCouriers.textContent = `Up to ${plan.courierIntegrations} couriers`;
  }

  planTracking.textContent = plan.trackingNotifications;
  planUsers.textContent = plan.userAccounts;

  // Calculate add-ons and additional costs
  let addOnTotal = 0;

  // Live shipping rates
  if (features.liveRates) {
    liveRatesAddon.style.display = "flex";
    if (plan.features.liveRates && plan.features.liveRates.included) {
      liveRatesAddon.querySelector("div:last-child").textContent =
        "Included in plan";
    } else {
      liveRatesAddon.querySelector("div:last-child").textContent = "$30/month";
      addOnTotal += 30;
    }
  } else {
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
    if (includedAccountsCount > 0) {
      const includeAccounts = document.getElementById(
        "included-accounts-addon"
      );
      includeAccounts.style.display = "flex";
      includeAccounts.querySelector(
        "div:first-child"
      ).textContent = `${includedAccountsCount} Child Accounts`;
      includeAccounts.querySelector("div:last-child").textContent =
        "Included in plan";
    } else {
      document.getElementById("included-accounts-addon").style.display = "none";
    }

    // Calculate additional accounts beyond what's included
    const additionalAccounts = Math.max(
      0,
      features.multiAccounts - includedAccountsCount
    );

    if (additionalAccounts > 0) {
      multiAccountAddon.style.display = "flex";

      if (
        plan.name.includes("Enterprise") &&
        plan.features.multiAccounts.custom
      ) {
        // Enterprise plans with custom pricing for additional accounts
        multiAccountAddon.querySelector(
          "div:first-child"
        ).textContent = `${additionalAccounts} Additional Child Accounts`;
        multiAccountAddon.querySelector("div:last-child").textContent =
          "Custom pricing";
      } else {
        // Standard pricing for additional accounts
        multiAccountAddon.querySelector(
          "div:first-child"
        ).textContent = `${additionalAccounts} Additional Child Accounts`;
        multiAccountAddon.querySelector("div:last-child").textContent = `$${
          25 * additionalAccounts
        }/month`;
        addOnTotal += 25 * additionalAccounts;
      }
    } else {
      multiAccountAddon.style.display = "none";
    }
  } else {
    // No child accounts needed
    document.getElementById("included-accounts-addon").style.display = "none";
    multiAccountAddon.style.display = "none";
  }

  // Branded returns portal
  if (features.brandedReturns) {
    brandedReturnsAddon.style.display = "flex";
    if (plan.features.brandedReturns && plan.features.brandedReturns.included) {
      brandedReturnsAddon.querySelector("div:last-child").textContent =
        "Included in plan";
    } else {
      brandedReturnsAddon.querySelector("div:last-child").textContent =
        "$20/month";
      addOnTotal += 20;
    }
  } else {
    brandedReturnsAddon.style.display = "none";
  }

  // Flex usage information
  if (typeof plan.flexUsage === "number") {
    flexUsage.style.display = "flex";
    flexUsage.querySelector(
      "div:last-child"
    ).textContent = `+${plan.flexUsage.toFixed(2)} per additional label`;
  } else {
    flexUsage.style.display = "flex";
    flexUsage.querySelector("div:last-child").textContent = "Talk to Sales";
  }

  // Calculate and update total price
  let totalCost;
  if (typeof basePrice === "number") {
    totalCost = basePrice + addOnTotal;

    // If annual, adjust the display to show monthly equivalent
    if (isAnnual) {
      totalPrice.textContent = totalCost;
      document.querySelector("#total-price + span").textContent =
        "/month (paid annually)";
    } else {
      totalPrice.textContent = totalCost;
      document.querySelector("#total-price + span").textContent = "/month";
    }
  } else {
    totalPrice.textContent = "Custom";
    document.querySelector("#total-price + span").textContent = "/month";
  }

  // Generate feature recommendations
  generateFeatureRecommendations(plan, features);
}
