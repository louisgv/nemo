#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>

using namespace eosio;

class [[eosio::contract("nemoeosmark1")]] nemologbook : public contract {
public:
  using contract::contract;
    
  nemologbook(name receiver, name code,  datastream<const char*> ds):contract(receiver, code, ds) {}
    
  [[eosio::action]]
  void test() {
    
  }

  

  [[eosio::action]]
  void submit(name seller, std::string data_hash, uint32_t price) {
    require_auth( seller );
    nemotable table(get_self(), get_first_receiver().value);
  
    table.emplace(get_self(), [&](auto& nemotx) {
      nemotx.id = table.available_primary_key();
      nemotx.seller = seller;
      nemotx.data_hash = data_hash;
      nemotx.price = price;
    });
    
    /*
    
    getSelf.currentBalance

emplace

notify 

get diffBalance

emplace with diffBalance * 2


    */
    
    // print(balance)
  }
  
  [[eosio::action]]
  void claim(name buyer, uint64_t id) {
    require_auth( buyer );
    
    nemotable table(get_self(), get_first_receiver().value);
  
    auto iterator = table.find(id);

    check(iterator != table.end(), "Record does not exist");
  
    table.modify(iterator, buyer, [&](auto& nemotx) {
      nemotx.buyer = buyer;
    });
  }

  [[eosio::action]]
  void notify(name user, uint64_t msg) {
    require_auth(get_self());
    require_recipient(user);
  }


private:
  struct [[eosio::table("nemotablemk1")]] nemotx {
    uint64_t id;
    
    name seller;
    name buyer;
    std::string data_hash;
    uint32_t price;
    uint32_t submitTax;

    auto primary_key() const { return id; }
  };
  
  typedef multi_index<"nemotablemk1"_n, nemotx> nemotable;
  
   struct [[eosio::table]] account {
    asset    balance;

    uint64_t primary_key() const { return balance.symbol.code().raw(); }
   };
  
   typedef eosio::multi_index< "accounts"_n, account > accounts;

  
  void get_balance(name account) {
    accounts accountstable( "eosio.token"_n, account.value );
    const auto& ac = accountstable.get( symbol_code ("EOS").raw() );
    print (ac.balance);
  }
  
      // return ac.balance;

  // stats statstable( _self, sym_code_raw );
  // const auto& st = statstable.get( sym_code_raw, "symbol does not exist" );
  // check( st.supply.symbol == symbol, "symbol precision mismatch" );

  // accounts acnts( _self, owner.value );
   

    // return account_balance;

    
  void send_log_id(name user, std::uint64_t id) {
    action(
      permission_level{get_self(),"active"_n},
      get_self(),
      "notify"_n,
      std::make_tuple(user, id)
    ).send();
  };
};
