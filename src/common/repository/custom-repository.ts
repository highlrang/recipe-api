import { SetMetadata } from "@nestjs/common";

export function CustomRepository(entity: Function): ClassDecorator {
    return SetMetadata("CUSTOM_REPOSITORY", entity);
}