function EventEmitter(object, logEvents) {
	var once_events = {};
	var events = {};

	logEvents = logEvents || false;
	if (!object) {
		object = {};
	}

	/**
	 * Register a `callback` that will be called after the ones already installed for the `eventName`
	 * @param {String} eventName
	 * @param {Function} callback
	 */
	object.on = function(eventName, callback) {
		if (events[eventName] === undefined) {
			events[eventName] = [callback];
		} else {
			events[eventName].push(callback);
		}
	};

	/**
	 * Register a `callback` that will be called only once after the ones already installed for the `eventName`
	 * @param {String} eventName
	 * @param {Function} callback
	 */
	object.once = function(eventName, callback) {
		if (once_events[eventName] === undefined) {
			once_events[eventName] = [callback];
		} else {
			once_events[eventName].push(callback);
		}
	};

	/**
	 * Emit the event `eventName` with its associated `data`
	 * @param {String} eventName
	 * @param {Object} data
	 */
	object.emit = function(eventName, data) {
		if (logEvents) {
			console.log('EVENT[' + eventName + '] -> ' + data);
		}
		if (events[eventName] !== undefined) {
			for (let callback of events[eventName]) {
				callback.call(object, data);
			}
		}
		if (once_events[eventName] !== undefined) {
			for (let callback of once_events[eventName]) {
				callback.call(object, data);
			}
			once_events[eventName] = undefined;
		}
	};

	/**
	 * @param {String} eventName
	 * @param {Function} callback
	 */
	object.removeListener = function(eventName, callback) {
		if (events[eventName] === undefined) { return; }
		var i = events[eventName].indexOf(callback);
		if (i >= 0) {
			events[eventName].splice(i, 1);
		}
	};

	/**
	 * @param {String} eventName
	 */
	object.removeAllListener = function(eventName) {
		events[eventName] = undefined;
		once_events[eventName] = undefined;
	};

	return object;
}
