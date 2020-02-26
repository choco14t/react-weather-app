# React Weather App

Created based on [this sample](https://www.youtube.com/watch?v=_nSzMDx79Ao).

## Rquirements

* algolia account(App ID, API Key)
* Dark Sky API account(API Key)

## Setup

### Create `.env` from `.env.example`

![dotenv](https://i.imgur.com/ZvN3xXn.png)

Set your Dark Sky API key to `DARKSKY_KEY`.

```dotenv
// ...

DARKSKY_KEY="your-api-key"
```

### Create `config.js` from `config.example.js`

![config.js](https://i.imgur.com/J2Jjx76.png)

Set your algolia App ID, API key to `config.js`.

```javascript
export default {
  algolia: {
    appId: 'your-app-id',
    key: 'your-app-key'
  },
}
```

### Run

```shell script
$ php artisan serve

# in another tab
$ npm run watch
```

## References

* [Dark Sky API: Documentation Overview](https://darksky.net/dev/docs)
* [Algolia Places | Documentation](https://community.algolia.com/places/documentation.html)
