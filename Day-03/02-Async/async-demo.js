var pgm = (function(){
	function addSync(x,y){
		console.log('       [Service Provider] adding ', x , ' and ', y);
		var result = x + y;
		console.log('       [Service Provider] returning the result');
		return result;
	}

	function addSyncClient(x,y){
		console.log('[Service Consumer] triggering addSync');
		var result = addSync(x,y);
		console.log('[Service Consumer] result = ', result);
	}

	function addAsyncCallback(x,y, onResultFn){
		console.log('       [Service Provider] adding ', x , ' and ', y);
		setTimeout(function(){
			var result = x + y;
			console.log('       [Service Provider] returning the result');
			if (typeof onResultFn === 'function')
				onResultFn(result);
		},3000);
	}

	function addAsyncCallbackClient(x,y){
		console.log('[Service Consumer] triggering addAsyncCallback');
		addAsyncCallback(x,y, function(result){
			console.log('[Service Consumer] result = ', result);	
		});
		
	}

	var addAsyncEvents = (function(){
		var _subscriptions = [];
		function subscribe(subscriptionFn){
			_subscriptions.push(subscriptionFn);
		}
		function add(x,y){
			console.log('       [Service Provider] adding ', x , ' and ', y);
			setTimeout(function(){
				var result = x + y;
				console.log('       [Service Provider] returning the result');
				_subscriptions.forEach(function(subscriptionFn){
					subscriptionFn(result);
				})
			},3000);
		}

		return {
			subscribe : subscribe,
			add : add
		}
	})();

	function addAsyncPromise(x,y){
		console.log('       [Service Provider] adding ', x , ' and ', y);
		var promise = new Promise(function(/*success*/ resolveFn, /*failure*/ rejectFn){
			setTimeout(function(){
				var result = x + y;
				console.log('       [Service Provider] returning the result');
				resolveFn(result);
			},3000);
		});
		return promise;
	}

	return {
		addSyncClient : addSyncClient,
		addAsyncCallbackClient : addAsyncCallbackClient,
		addAsyncEvents : addAsyncEvents,
		addAsyncPromise : addAsyncPromise
	}
})();