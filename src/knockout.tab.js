(function(knockout){
	knockout.tabs = [];
			
	var setupTabEntry = function(tabElement, contentElement, isVisible, groupName, options) {
		var tabEntry = {
			IsVisible: knockout.observable(isVisible),
			TabElement: tabElement,
			ContentElement: contentElement
		};

		var visibilitySubscription = function(visibility) {
			if(visibility) 
			{
				if(options.activeClass)
				{ $(tabEntry.TabElement).addClass(options.activeClass); }
				
				if(options.onVisible)
				{ options.onVisible(tabEntry, groupName, options); }
				else
				{ $(tabEntry.ContentElement).show(); }
			}
			else
			{
				if(options.activeClass)
				{ $(tabEntry.TabElement).removeClass(options.activeClass); }
				
				if(options.onHidden)
				{ options.onHidden(tabEntry, groupName, options); }
				else
				{ $(tabEntry.ContentElement).hide(); }
			}
		};
		
		visibilitySubscription(isVisible);
		tabEntry.IsVisible.subscribe(visibilitySubscription);
		knockout.tabs[groupName].push(tabEntry);
		return tabEntry;
	};
	
	var setupTabInteractions = function(tabEntry, groupName, options) {
		var onChangingTabProxy = function() {
			var groupedTabEntries = knockout.tabs[groupName];
			groupedTabEntries.forEach(function(groupedTabEntry, index){
				if(tabEntry.ContentElement == groupedTabEntry.ContentElement)
				{ groupedTabEntry.IsVisible(true); }
				else
				{ groupedTabEntry.IsVisible(false); }				
			});
			
			if(options.onTabChanged)
			{ options.onTabChanged(tabEntry, groupName, options); }
		};
				
		tabEntry.TabElement.onclick = onChangingTabProxy;
	}

	knockout.bindingHandlers.tab = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var allBindings = allBindingsAccessor();
			var tabBindings = allBindings.tab;
			
			var contentSelector = knockout.unwrap(tabBindings.content);
			var tabGroup = knockout.unwrap(tabBindings.group);
			var options = knockout.unwrap(tabBindings.options) || {};
						
			if(!contentSelector)
			{
				console.log("Unable to setup tabs due to no content being set");
				return;
			}
			
			if(!tabGroup) { tabGroup = "default"; }
			if(!knockout.tabs[tabGroup]) { knockout.tabs[tabGroup] = []; }
			
			var isVisible = (options.isDefault) ? true : false;
			var contentElement = $(contentSelector)[0];
			
			var tabEntry = setupTabEntry(element, contentElement, isVisible, tabGroup, options);
			setupTabInteractions(tabEntry, tabGroup, options);
		}
	};

})(typeof exports === 'undefined' ? this["ko"] : require("knockout"));