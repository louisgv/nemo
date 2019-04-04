#include <eosio/eosio.hpp>
using namespace eosio;

class [[eosio::contract]] nemoeosmark1 : public contract {
  public:
    using contract::contract;
    
  [[eosio::action]]
  void hi(name user) {
    print("Hello v2, ", user);
  }
  
};
