<br />
<div align="center">
  <h3 align="center">valhalla-ts</h3>

  <p align="center">
    valhalla api client
    <br />
    <a href="https://github.com/ipwnd/valhalla-ts/issues">Report Bug</a>
    ·
    <a href="https://github.com/iwpnd/valhalla-ts/issues">Request Feature</a>
  </p>
</div>

## About The Project

Easy to use, fully typed http client for [valhalla routing service](https://github.com/valhalla/valhalla).

### Installation

```sh
yarn install @iwpnd/valhalla-ts

# or

npm install @iwpnd/valhalla-ts
```

## Usage

Either use your own valhalla instances url, pull
an image of valhalla that includes Andorra routing tiles.

```bash
docker run --rm ghcr.io/iwpnd/valhalla-andorra:latest
```

```typescript
import { Valhalla } from '@iwpnd/valhalla-ts';

const valhalla = new Valhalla('https://localhost:8002');

const route = await valhalla.route({
    locations: [
        { lat: 42.505497, lon: 1.528883 },
        { lat: 42.51276, lon: 1.53527 },
    ],
    costing: 'bicycle',
});
```

## Roadmap

-   [x] valhalla client
-   [x] fully typed
-   [ ] finish documentation
-   [ ] request helper
-   [ ] load balancing

## Contributing

Contributions are neither expected nor encouraged. If you for whatever
reason you want to contribute here, create an issue describing your problem first.
Unsolicited PRs are going to be deleted straight up.

If we evaluated that you're in the right repository,
are of a clear state of mind and have cause to do what you wanna do, please
follow the steps below.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/my-amazing-feature`)
3. Commit your Changes (`git commit -m 'feat: some amazing feature'`)
4. Push to the Branch (`git push origin feat/my-amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Benjamin Ramser - [@iwpnd](https://twitter.com/iwpnd) - iwpnd@posteo.com

Project Link: [https://github.com/iwpnd/valhalla-ts](https://github.com/iwpnd/valhalla-ts)

## Acknowledgments

-   [valhalla](https://github.com/valhalla/valhalla)
-   [gis-ops](https://github.com/gis-ops/valhalla)
