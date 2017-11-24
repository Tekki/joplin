const BaseSyncTarget = require('lib/BaseSyncTarget.js');
const { _ } = require('lib/locale.js');
const { Setting } = require('lib/models/setting.js');
const { FileApi } = require('lib/file-api.js');
const { FileApiDriverMemory } = require('lib/file-api-driver-memory.js');
const { Synchronizer } = require('lib/synchronizer.js');

class SyncTarget1 extends BaseSyncTarget {

	id() {
		return 1;
	}

	name() {
		return 'memory';
	}

	label() {
		return 'Memory';
	}

	isAuthenticated() {
		return true;
	}

	initFileApi() {
		const fileApi = new FileApi('/root', new FileApiDriverMemory());
		fileApi.setLogger(this.logger());
		fileApi.setSyncTargetId(this.id());
		return fileApi;
	}

	async initSynchronizer() {
		return new Synchronizer(this.db(), this.fileApi(), Setting.value('appType'));
	}

}

module.exports = SyncTarget1;