# Knockout.Tab

A simple binding to allow you to easily add tab behaviour to your project.

## More Info
This behaviour was created because when working with mobile applications there is a lot of showing and hiding pages
and in web applications I often found I was having to use JqueryUI or some other tab system to create some form of
tabs on a page. The behaviour required by both scenarios was the same, you click something and it shows 1 item and
hides all others in a given group. 

So rather than writing lots of boilerplate code in viewmodels to control the showing and hiding of elements which
create an implicit binding between the viewmodel and the elements name in the view, you can now instead set the 
view behaviour at view level and if you do need to do custom logic or notifications then do it in a seperated manner.

Think of this as a purely behavioural binding, it gives you 0 styling like JqueryUI or other tab libraries, it assumes 
you will style the tabs and content yourself, and offers the extensions for you to know when something is active or hidden 
and how it should be shown and hidden but in most scenarios just put a content and group on a tab and then put some css
on it and you are golden.

## Example

A simple example of setting up a tab:
```
<a data-bind="tab: { content: '#tab-content-1', options: { isDefault: true } }">Tab 1</a>
<a data-bind="tab: { content: '#tab-content-2' }">Tab 2</a>
<div id="tab-content-1">Some Content</div>
<div id="tab-content-2">Some More Content</div>
```

The binding should ALWAYS have a content argument which is the jquery selector for the content element to be shown when clicked.
Then it is expected that one tab will be set as the default one, however you can have all hidden without setting a default if
you want it done this way.

The available options for this binding are:

* **content** - The jquery selector for the modal content element
* **group** - The textual group identifier, should be unique for each tab group
* **options** - The collection of options for the modal instance, see below for available options
 * **isDefault** - This will set this tab's content as visible when loading, as most times one tab will be seen as the default one
 * **activeclass** - This is the css class that will be applied to active tabs
 * **onVisible** - The callback for you to specify your own logic for showing the tab content
 * **onHidden** - The callback for you to specify your own logic for hiding the tab content
 * **onTabChanged** - The callback for when a tab has been activated
 
The callbacks above will always be sent the tabEntry object, the group name, and the options that are applied to that tab.
You can add your own custom options such as a *data* entry incase you need to pass any view model data to callbacks, or specific 
transition data for your custom logic. It is recommended you try to reduce this wherever possible but the functionality is
available for you to do this if needed.

There is finally a helper method to help you manually show a tab if required, it is a bit nasty as it requires the viewmodel
to know the html selector of the tab, however in certain cases like showing a tab if validation failed or showing a page
if an event occurs it can help you out:

```
ko.tabs.show("#the-tab-selector-here");
```
 
Here is an example of what it does and how to use it.
[View Example](https://rawgithub.com/grofit/knockout.tab/master/example.html)