#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;

CONTRACT nemoeosmark1 : public contract {
  public:
    using contract::contract;
    nemoeosmark1(eosio::name receiver, eosio::name code, datastream<const char*> ds):contract(receiver, code, ds) {}

    ACTION hi(name user);
  
  private:
    TABLE tableStruct {
      name key;
      std::string name;
    };
    typedef eosio::multi_index<"table"_n, tableStruct> table;
};

EOSIO_DISPATCH(nemoeosmark1, (hi))
