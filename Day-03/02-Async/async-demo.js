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

	function addAsync(x,y, onResultFn){
		console.log('       [Service Provider] adding ', x , ' and ', y);
		setTimeout(function(){
			var result = x + y;
			console.log('       [Service Provider] returning the result');
			if (typeof onResultFn === 'function')
				onResultFn(result);
		},3000);
	}

	function addAsyncClient(x,y){
		console.log('[Service Consumer] triggering addAsync');
		addAsync(x,y, function(result){
			console.log('[Service Consumer] result = ', result);	
		});
		
	}

	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient
	}
})();