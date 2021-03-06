"use strict";

import URL from "url";
import fs from "fs";

export default class File {

	static async *readStream (url, chunksize = 64 * 1024) {
		const parsedUrl = URL.parse(url);

		if (!parsedUrl.protocol)
			throw new Error(`No/invalid protocol in "${url}".`);
		
		switch (parsedUrl.protocol) {
			case "file:": {
				const stream = fs.createReadStream(parsedUrl.pathname, {
					encoding: "utf8",
					highWaterMark: chunksize
				});

				let buffer = "";
				for await (const chunk of stream) {
					buffer += chunk;
					const to = buffer.lastIndexOf("\n");
					if (to === -1) {
						continue;
					}
					yield buffer.slice(0, to + 1);
					buffer = buffer.slice(to + 1);
				}

				if (buffer[0])
					yield buffer;
				break;
			}
			default: throw new Error(`Unsupported protocol "${parsedUrl.protocol}".`);
		}
	}

	// TODO: Actually make async writestream
	// TODO: Replicate the return value(s) of Node internal readstream
	static writeStream (path, data) {
		if (!path.startsWith("file:"))
			throw new Error(`Cannot work with non-file protocol urls (yet?).`);
		
		path = URL.fileURLToPath(path);

		let resolve;
		let reject;
		const promise = new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		});
		fs.writeFile(path, data, err => {
			return (err)
				? reject(err)
				: resolve();
		});
		return promise;
	}

}