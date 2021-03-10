const fs = require('fs')
const path = require('path')

const android = {
	launcher: [{
		density: 'ldpi',
		path: 'artwork/icons/android/android-ldpi.png'
	}, {
		density: 'mdpi',
		path: 'artwork/icons/android/android-mdpi.png'
	}, {
		density: 'tvdpi',
		path: 'artwork/icons/android/android-tvdpi.png'
	}, {
		density: 'hdpi',
		path: 'artwork/icons/android/android-hdpi.png'
	}, {
		density: 'xhdpi',
		path: 'artwork/icons/android/android-xhdpi.png'
	}, {
		density: 'xxhdpi',
		path: 'artwork/icons/android/android-xxhdpi.png'
	}, {
		density: 'xxxhdpi',
		path: 'artwork/icons/android/android-xxxhdpi.png'
	}],
	notification: [{
		density: 'hdpi',
		path: 'artwork/icons/android/notification-hdpi.png'
	}, {
		density: 'ldpi',
		path: 'artwork/icons/android/notification-ldpi.png'
	}, {
		density: 'mdpi',
		path: 'artwork/icons/android/notification-mdpi.png'
	}, {
		density: 'xhdpi',
		path: 'artwork/icons/android/notification-xhdpi.png'
	}, {
		density: 'xxhdpi',
		path: 'artwork/icons/android/notification-xxhdpi.png'
	}, {
		density: 'xxxhdpi',
		path: 'artwork/icons/android/notification-xxxhdpi.png'
	}]
}

const ios = {
	icons: {
		contents: 'artwork/icons/ios/Contents.json',
		images: [
			'artwork/icons/ios/ios-20@2x.png',
			'artwork/icons/ios/ios-20@3x.png',
			'artwork/icons/ios/ios-29@2x.png',
			'artwork/icons/ios/ios-29@3x.png',
			'artwork/icons/ios/ios-40@2x.png',
			'artwork/icons/ios/ios-40@3x.png',
			'artwork/icons/ios/ios-60@2x.png',
			'artwork/icons/ios/ios-60@3x.png'
		]
	},
	splash: {
		contents: 'artwork/splash/ios/Contents.json',
		images: [
			'artwork/splash/ios/iphone-2x.png',
			'artwork/splash/ios/iphone-retina.png',
			'artwork/splash/ios/iphone-4.7.png',
			'artwork/splash/ios/iphone-5.5.png'
		]
	}
}

module.exports = function(context) {
	// android - launcher

	android.launcher.forEach(function(icon) {
		const destination = 'platforms/android/res/mipmap-' + icon.density

		createDir(destination)

		fs.createReadStream(icon.path).pipe(fs.createWriteStream(destination + '/icon.png'))
	})

	// android - notification

	android.notification.forEach(function(icon) {
		const destination = 'platforms/android/res/drawable-' + icon.density

		createDir(destination)

		fs.createReadStream(icon.path).pipe(fs.createWriteStream(destination + '/fcm_push_icon.png'))
	})

	// ios - icons

	fs.createReadStream(ios.icons.contents).pipe(fs.createWriteStream('platforms/ios/Crew Untold/Images.xcassets/AppIcon.appiconset/Contents.json'))

	ios.icons.images.forEach(function(icon) {
		const destination = path.basename(icon)

		fs.createReadStream(icon).pipe(fs.createWriteStream('platforms/ios/Crew Untold/Images.xcassets/AppIcon.appiconset/' + destination))
	})

	// ios - splash

	fs.createReadStream(ios.splash.contents).pipe(fs.createWriteStream('platforms/ios/Crew Untold/Images.xcassets/LaunchImage.launchimage/Contents.json'))

	ios.splash.images.forEach(function(splash) {
		const destination = path.basename(splash)

		fs.createReadStream(splash).pipe(fs.createWriteStream('platforms/ios/Crew Untold/Images.xcassets/LaunchImage.launchimage/' + destination))
	})
}

function createDir(dir) {
	if (fs.existsSync(dir)) {
		return
	}

	try {
		fs.mkdirSync(dir)
	} catch (err) {
		if (err.code === 'ENOENT') {
			createDir(path.dirname(dir))
			createDir(dir)
		}
	}
}
