function Smiley(title, url, trigger)
{
	this.title = title;
	this.url = url;
	this.trigger = trigger;
}

function SmileyCollection(smilies) 
{
	this.smilies = (typeof smilies === "undefined") ? [] : smilies;

	this.serialize = function(key)
	{
		localStorage.setItem(key, JSON.stringify(this.smilies));
	};
}

// deserializes all smilies from the local storage specified by the key
SmileyCollection.deserialize = function(key)
{
	smileyArray = JSON.parse(localStorage.getItem(key));
	collection = new SmileyCollection()
	if(smileyArray === null) return collection;

	smileyArray.forEach(function(smiley)
	{
		var useLegacyMode = typeof smiley.title === "undefined" || typeof smiley.url === "undefined";
		if(!useLegacyMode) 
			collection.smilies.push(new Smiley(smiley.title, smiley.url, smiley.trigger))
		else // migration
			collection.smilies.push(new Smiley(smiley[0], smiley[1], ""))
	})

	return collection
};
