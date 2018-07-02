import Command from "@oclif/command";
import * as Config from "@oclif/config";
export declare class Weather extends Command {
    private accuweatherKey;
    static description: string;
    static usage: string;
    static examples: string[];
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    static flags: {
        emoji: import("../../node_modules/@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        word: import("../../node_modules/@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        verbose: import("../../node_modules/@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        complete: import("../../node_modules/@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    constructor(argv: string[], config: Config.IConfig, accuweatherKey: string);
    run(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map