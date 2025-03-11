// Seline Analytics

document.addEventListener("DOMContentLoaded", function() {
    // Initialize tracking variables
    let calculatorInteractions = 0;
    let startTime = new Date();
    let previousPlan = '';
    let previousCost = '';
    let hasReachedResults = false;
  
    // 1. CALCULATOR USAGE EVENTS
    
    // Track when users adjust the volume slider
    const volumeSlider = document.getElementById('volume-slider');
    const volumeInput = document.getElementById('volume-input');
    
    if (volumeSlider) {
      volumeSlider.addEventListener('change', function() {
        calculatorInteractions++;
        seline.track("calculator: adjusted volume", {
          volume: this.value,
          inputMethod: 'slider'
        });
      });
    }
    
    // Track direct input of volume
    if (volumeInput) {
      volumeInput.addEventListener('change', function() {
        calculatorInteractions++;
        seline.track("calculator: adjusted volume", {
          volume: this.value,
          inputMethod: 'direct input'
        });
      });
    }
  
    // Track when a user selects a billing period
    const billingToggle = document.getElementById('billing-toggle');
    if (billingToggle) {
      billingToggle.addEventListener('change', function() {
        calculatorInteractions++;
        seline.track("calculator: changed billing period", {
          period: this.checked ? 'annual' : 'monthly',
          savingsApplied: this.checked ? '10%' : '0%'
        });
      });
    }
  
    // Track when features are selected (checkboxes)
    const featureCheckboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
    featureCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        calculatorInteractions++;
        // Get feature name from label or id
        const featureLabel = this.closest('.checkbox-container').querySelector('label');
        const featureName = featureLabel ? featureLabel.textContent.trim() : this.id;
        
        seline.track("feature: toggled", {
          feature: featureName,
          featureId: this.id,
          state: this.checked ? 'enabled' : 'disabled',
          section: getFeatureSection(this)
        });
      });
    });
  
    // Track when a dropdown selection changes
    const dropdowns = document.querySelectorAll('select');
    dropdowns.forEach(select => {
      select.addEventListener('change', function() {
        calculatorInteractions++;
        // Get the label text for this dropdown
        const label = this.closest('.feature-item')?.querySelector('label')?.textContent || this.id;
        
        seline.track("option: changed", {
          option: label,
          optionId: this.id,
          value: this.options[this.selectedIndex].text,
          valueId: this.value
        });
      });
    });
  
    // Track multi-account input changes
    const multiAccounts = document.getElementById('multi-accounts');
    if (multiAccounts) {
      multiAccounts.addEventListener('change', function() {
        calculatorInteractions++;
        seline.track("option: changed multi-accounts", {
          option: "Multi-location/Multi-brand Accounts",
          value: this.value,
          section: "Add-on Features"
        });
      });
    }
  
    // 2. KB LINK INTERACTIONS
    
    // Add data attributes to all KB links for tracking clicks
    const kbLinks = document.querySelectorAll('.kb-link');
    kbLinks.forEach(link => {
      // Add data attribute for click tracking
      link.setAttribute('data-sln-event', 'documentation: visited');
      
      // Get the feature name from the closest feature item or parent
      const featureItem = link.closest('.feature-item');
      const featureName = featureItem ? 
        featureItem.querySelector('label')?.textContent : 
        link.closest('li')?.textContent.split('Learn more')[0].trim();
      
      if (featureName) {
        link.setAttribute('data-sln-event-feature', featureName);
      }
      
      // Get the section name
      const section = getFeatureSection(link);
      if (section) {
        link.setAttribute('data-sln-event-section', section);
      }
      
      // Track when copy button is clicked
      const copyBtn = link.querySelector('.copy-link-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const url = link.getAttribute('href');
          seline.track("link: copied", {
            feature: featureName || 'Unknown feature',
            url: url,
            section: section || 'Unknown section'
          });
        });
      }
    });
  
    // 3. PLAN AND TOTAL COST TRACKING
    
    // Create a MutationObserver to detect when the recommended plan changes
    const planNameElement = document.getElementById('plan-name');
    const totalPriceElement = document.getElementById('total-price');
    
    // disabled because it logged too many interactions
    // if (planNameElement && totalPriceElement) {
    //   // Initialize previous values
    //   previousPlan = planNameElement.textContent.trim();
    //   previousCost = totalPriceElement.textContent.trim();
      
    //   // Create a mutation observer to watch for changes
    //   const observer = new MutationObserver(function(mutations) {
    //     const currentPlan = planNameElement.textContent.trim();
    //     const currentCost = totalPriceElement.textContent.trim();
        
    //     // Check if plan changed
    //     if (previousPlan !== currentPlan) {
    //       seline.track("plan: recommendation changed", {
    //         from: previousPlan,
    //         to: currentPlan,
    //         volume: document.getElementById('volume-input')?.value || 'unknown',
    //         interactions: calculatorInteractions
    //       });
    //       previousPlan = currentPlan;
    //     }
        
    //     // Check if total cost changed
    //     if (previousCost !== currentCost) {
    //       seline.track("cost: updated", {
    //         cost: currentCost,
    //         plan: currentPlan,
    //         billingPeriod: document.getElementById('billing-toggle')?.checked ? 'annual' : 'monthly'
    //       });
    //       previousCost = currentCost;
    //     }
    //   });
      
    //   // Start observing changes to the plan and price elements
    //   observer.observe(planNameElement, { childList: true, characterData: true, subtree: true });
    //   observer.observe(totalPriceElement, { childList: true, characterData: true, subtree: true });
    // }
    
    
    
    // Track when user views the results (scrolls to the results section)
    const resultSection = document.querySelector('.results-section');
    if (resultSection) {
      const observeResults = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasReachedResults) {
            hasReachedResults = true; // Only track once per session
            const timeSpent = Math.round((new Date() - startTime) / 1000); // in seconds
            
            seline.track("results: viewed", {
              plan: document.getElementById('plan-name')?.textContent || 'unknown',
              cost: document.getElementById('total-price')?.textContent || 'unknown',
              timeSpent: timeSpent,
              interactions: calculatorInteractions,
              volume: document.getElementById('volume-input')?.value || 'unknown'
            });
          }
        });
      }, { threshold: 0.7 }); // Trigger when 70% of the results section is visible
      
      observeResults.observe(resultSection);
    }
    
    // Helper function to get the section name for a given element
    function getFeatureSection(element) {
      // Walk up the DOM to find the closest section title
      let current = element;
      let sectionName = '';
      
      // Keep looking up until we find a section title or run out of parents
      while (current && !sectionName) {
        // Move up to the previous sibling until we find a section title
        let sibling = current.parentElement;
        while (sibling) {
          // Check if this is a section title
          const sectionTitle = sibling.querySelector('.section-title h2');
          if (sectionTitle) {
            sectionName = sectionTitle.textContent.trim();
            break;
          }
          sibling = sibling.previousElementSibling;
        }
        
        // If we haven't found a section title, move up to the parent
        current = current.parentElement;
      }
      
      return sectionName;
    }
  });