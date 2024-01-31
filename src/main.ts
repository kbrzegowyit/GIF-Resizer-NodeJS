import gifResize from "./gif-resizer.js";
import argsParser from "./args-parser.js";

try {
    const config = argsParser(process.argv);
    await gifResize({ ...config });
} catch (error: any) {
    process.stderr.write(error.message);
}
