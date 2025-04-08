import {
  Customer,
  CustomerRepository,
} from "src/domain/customer/customer.entity";

export interface FetchProfileUsecase {
  execute(id: string): Promise<Customer>;
}

export class fetchProfileUsecase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<Customer> {
    const profile = await this.customerRepository.getByID(id);
    return profile;
  }

  public static newUsecase(
    customerRepository: CustomerRepository
  ): FetchProfileUsecase {
    return new fetchProfileUsecase(customerRepository);
  }
}
