function Smiley(title, url, trigger)
{
	this.title = title;
	this.url = url;
	this.trigger = trigger;
}

function SmileyCollection(smilies) 
{
	this.smilies = (typeof smilies === "undefined") ? [] : smilies;
	// deserializes all smilies from the local storage specified by the key
	this.deserialize = function(key)
	{
		smileyArray = JSON.parse(localStorage.getItem(key));
		self = this
		smileyArray.forEach(function(smiley)
		{
			self.smilies.push(new Smiley(smiley.title, smiley.url, smiley.trigger))
		})
	};

	this.serialize = function(key)
	{
		localStorage.setItem(key, JSON.stringify(this.smilies));
	};
}